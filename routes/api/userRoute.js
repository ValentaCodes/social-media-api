const router = require('express').Router();

// Imports our user controllers
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// http://localhost:3001/api/users/
router.route('/').get(getUsers).post(createUser);

// http://localhost:3001/api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
