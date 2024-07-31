const { User, Thought } = require('../models');

module.exports = {
    
    // Thought Routes
async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findById(req.body.userId);
      user.thoughts.push(newThought._id);
      await user.save();
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
   async createReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.id(req.params.reactionId).remove();
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};