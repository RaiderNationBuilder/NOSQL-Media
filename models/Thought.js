// Thought

// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



// Thought

// thoughtText

// String
// Required
// Must be between 1 and 280 characters
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)

// String
// Required
// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    username: {
        type: String
    },
    reactionBody: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    reactions: [
        reactionSchema
    ]
},
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const User = model('User', UserSchema);

module.exports = User;