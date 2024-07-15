const { Schema, model, SchemaTypes } = require('mongoose');
const Thought = require('./thoughts');
const { URLSearchParams } = require('whatwg-url');

const validateEmail = (input) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(input)
                        
}

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validateEmail,
                message: 'Email validation falied'
            }
        },
        thoughts: {
            type: [
                {
                    type: SchemaTypes.ObjectId,
                    ref: 'Thought' 
                }
            ]
        },
        friends: {
            type: [
                {
                    type: SchemaTypes.ObjectId,
                    ref: 'User'
                }
            ]
        }
    }
)

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('user', usersSchema)

module.exports = User