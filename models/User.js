// -User
//      username
//      String
//      Unique
//      Required
//      Trimmed
// -email
//      String
//      Required
//      Unique
//      Must match a valid email address (look into Mongoose's matching validation)
// -thoughts
//      Array of _id values referencing the Thought model
// -friends
//      Array of _id values referencing the User model (self-reference)

const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a email address']
        },
        thoughts: [
                {
                    type: Schema.Types.ObjectId,                // Thoughts array ObjectID
                    ref: 'Thought',
                },
            ],
        friends: [                                              // Friends array ObjectID
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
        ],
        

    },
    {
        toJSON: {                                           // Schema settings
            virtuals: true,

        },
        id: false,
    }
);




userSchema.virtual('friendCount').get(function () {        //length of friends array
    return this.friends.length;

});


const User = model('User', userSchema);                  // Create User model with userSchema   



module.exports = User;



