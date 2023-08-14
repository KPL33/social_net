//In this file, we "require" "express" to interact with our database.
const router = require('express').Router();

//Here, we establish routes to the various functions involved with our "users" and "friends", as established in our "controllers/users" file, elsewhere in our app.
const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/users');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUsersById).put(updateUserById).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

//Here, we bundle these routes, to be imported by "routes/api-routes/index.js".
module.exports = router;