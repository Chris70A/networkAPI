const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find()                                                    // Find all users
            .select('-__v')                                            // Exclude version key
            .then((dbUserData) => {
                res.json(dbUserData);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    
    // Get single by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })                        // Find by ID
            .select('-__v')                                             // Exclude version key
            .populate('friends')                                        // Populate friends
            .populate('thoughts')                                       // Populate thoughts
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // Create a new user
    createUser(req, res) {
        User.create(req.body)                                   // Create user object
            .then((dbUserData) => {                             // User creation success
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },



    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(                                  // Find user
            { _id: req.params.userId },                         // By user ID
            { $set: req.body },                                 // Update user data
            {
                runValidators: true,                            // Run validations
                new: true,                                      // Return new documnent
            }
        )

        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },


    // Delete user 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })                               // Find and delete
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this ID' });
                }

        
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });       // Delete thoughts
            })
            .then(() => {
                res.json({ message: 'User and thoughts deleted' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },





    // Add friend 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },                                 // Match user ID
            { $addToSet: { friends: req.params.friendId } },            // Add friend ID
            { new: true })                                              // Return updated document
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },



    // Remove friend 
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },                   // Find user by ID
            { $pull: { friends: req.params.friendId } },                    // Remove friend 
            { new: true })                                                  // Return updated document
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = userController;
