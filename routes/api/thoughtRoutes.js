const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController')

// api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// api/thoughs/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)

// api/thoughs/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;