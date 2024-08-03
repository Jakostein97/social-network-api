const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriendList,
  deleteFriendList
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// //api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriendList);

// //api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriendList);

module.exports = router;
