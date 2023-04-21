const { Thought, User } = require('../models');

const thoughtController = {
  
    
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()                                                // Find all thoughts
            .sort({ createdAt: -1 })                                  // Sort descending order
            .then((dbThoughtData) => {                                // Send found thoughts
                res.json(dbThoughtData);
            })

            .catch((err) => {                                         // Errors
                console.log(err);
                res.status(500).json(err);
            });
    },



    // Get a single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })                // Find thought by id
            .then((dbThoughtData) => {
                if (!dbThoughtData) {                                 // If no thought found
                    return res.status(404).json({ message: 'No thought found' });
                }
                res.json(dbThoughtData);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },




    // create a thought
    createThought(req, res) {
        Thought.create(req.body)                                       // Create thought document
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(                          // Update users thoughts
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })


            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this ID but thought was created' });
                }

                res.json({ message: 'Thought Created' });
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought associated with this id' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {                                                                           // Check if thought exists
                    return res.status(404).json({ message: 'No thought with this id!' });
                }

                
                return User.findOneAndUpdate(                                                                  // remove thought from field
                    { thoughts: req.params.thoughtId },                                                        // Locate user with thought
                    { $pull: { thoughts: req.params.thoughtId } },                                             // Remove thought from user
                    { new: true }                                                                              // Return updated user
                );
            })

            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought created but no user with this id!' });
                }


                res.json({ message: 'Thought Deleted' });
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },





    // add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(                                                   // Find thought
            { _id: req.params.thoughtId },                                          // Match thoughtID
            { $addToSet: { reactions: req.body } },                                 // Add reaction               
            { runValidators: true, new: true }                                      // Set options
        )

        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtData);
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // remove reaction from thought
    removeReaction(req, res) {  
        Thought.findOneAndUpdate(                                                   // Find and update Thought                       
            { _id: req.params.thoughtId },                                          // Match thought ID
            { $pull: { reactions: { reactionId: req.params.reactionId } } },        // Pull reaction ID
            { runValidators: true, new: true }                                      // Set options
        )

        .then((dbThoughtData) => { 
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtData);
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;









