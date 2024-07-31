const { User, Thought } = require('../models');

// User Routes
module.exports = {
 async getUser(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
 async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      await Thought.deleteMany({ username: deletedUser.username });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createFriendList(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.push(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
 async deleteFriendList(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}