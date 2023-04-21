// -thoughtText
//      String
//      Required
//      Must be between 1 and 280 characters
// -createdAt
//      Date
//      Set default value to the current timestamp
//      Use a getter method to format the timestamp on query
// -username (The user that created this thought)
//      String
//      Required
// -reactions (These are like replies)
//      Array of nested documents created with the reactionSchema


const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');

const dateFormat = require('../utils/dateFormat');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Create a thought',
            minlength: 1,
            maxlength: 300
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type:String,
            required: true
        },
        reactions: [reactionSchema]                             // Array Reaction schema
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


// Create virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

});



//Thought model with thoughtSchema
const Thought = model('Thought', thoughtSchema);


module.exports = Thought;



