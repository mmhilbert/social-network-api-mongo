const { default: Errors } = require('undici-types/errors');
const { User, Thought } = require('../models')

module.exports = {
    // get all thoughts 
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }

            res.json({ message: 'Thought deleted!' });

        } catch (err) {
            res.status(500).json(err)
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            console.log("You're adding a reaction")
            console.log(req.body)
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // remove a reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}