//In this file, we "require" "express" to interact with our database.
const router = require('express').Router();

//Here, we establish routes to the various functions involved with our "thoughts" and "reactions", as established in our "controllers/thoughts" file, elsewhere in our app.
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

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//Here, we bundle these routes, to be imported by "routes/api-routes/index.js".
module.exports = router;