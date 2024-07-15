const { User } = require('../models')

module.exports = {
    // get all users 
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userUd },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }

            res.json({ message: 'User deleted!' });

        } catch (err) {
            res.status(500).json(err)
        }
    },
    // add a friend to a user
    async addFriend(req, res) {
        try {
            console.log("You're adding a friend")
            console.log(req.body)
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'No user found with that ID' })
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'No user found with that ID' })
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}