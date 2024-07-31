const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriendList,
  deleteFriendlist
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
router.route('/:userId/friends/:friendId').post(createReaction);

// //api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteReaction);

module.exports = router;
