const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThoughtbyId,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughts');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtbyId).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;