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
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({_id:req.body.userId}, 
        {$push: {thoughts:newThought._id}}, {new:true}
      );
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$set:req.body}, { new: true });
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({_id:req.params.thoughtId});
      const userThoughts = await User.findOneAndUpdate(
        {thoughts: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new:true}
      )
      res.json({message: `thought from ${userThoughts.username} deleted`});
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  },
  
   async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate({_id:req.params.thoughtId},
        {$addToSet: {reactions: req.body}}
      );
      res.status(200).json(reaction)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id:req.params.thoughtId},
        {$pull: {reactions: req.body}}
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};