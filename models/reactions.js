const { Schema, model, SchemaTypes, Types } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: SchemaTypes.ObjectId,
            default: () => new Types.ObjectId(),
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
            type: Date,
            default: Date.now,
            get: (createdAt) => new Date(createdAt).toString()
        }
    }
)

module.exports = reactionSchema