// **Reaction (SCHEMA ONLY)
// -reactionId
//      Use Mongoose's ObjectId data type
//      Default value is set to a new ObjectId
// -reactionBody
//      String
//      Required
//      280 character maximum
// -username
//      String
//      Required
// -createdAt
//      Date
//      Set default value to the current timestamp
//      Use a getter method to format the timestamp on query



const { Schema, Types } = require('mongoose');



const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,                    // ObjectId data type
            default: () => Types.ObjectId()                 // new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,                                 // Field required
            maxlength: 300                                  // max length
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)          // Format timestamp
        }
    },
    {
        toJSON: {
            getters: true                                    // serialization
        },
        id: false                                            // no virtual ID property
    }
);



module.exports = reactionSchema;



