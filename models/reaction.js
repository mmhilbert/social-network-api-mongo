const { Schema, model, SchemaTypes } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: SchemaTypes.ObjectId,
            default: () => new SchemaTypes.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            Date,
            default: Date.now,
            get: (createdAt) => new Date(createdAt).toString()
        }
    }
)

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction