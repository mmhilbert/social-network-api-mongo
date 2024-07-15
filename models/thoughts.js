const { Schema, model, SchemaTypes } = require('mongoose')
const reactionSchema = require('./reaction')

const thoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            Date,
            default: Date.now,
            get: (createdAt) => new Date(createdAt).toString()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]

    }
)

const Thought = model('thought', thoughtsSchema)

module.exports = Thought