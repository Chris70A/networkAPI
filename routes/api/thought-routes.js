const router = require('express').Router();
const {


  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,


} = require('../../controllers/thought-controller');


// /thoughts
router.route('/').get(getThoughts).post(createThought);


// /thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


// /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);


// /thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);




module.exports = router;
