const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/users');

const {
  createThought
} = require('../../controllers/thoughts')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUsersById).put(updateUserById).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;