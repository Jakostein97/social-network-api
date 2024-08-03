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
      const user = await User.findOne({_id: req.params.userId}).populate('thoughts').populate('friends');
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
      const updatedUser = await User.findOneAndUpdate({_id: req.params.userId}, {$set:req.body}, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({_id:req.params.userId});
      await Thought.deleteMany({ _id: {$in: deletedUser.thoughts} });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createFriendList(req, res) {
    try {
        const user = await User.findOneAndUpdate({_id:req.params.userId}, 
          {$addToSet: {friends:req.params.friendId}}, {new:true}
        )
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