const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId });
      if (thoughts.length === 0) {
        res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      } else {
        res.json(thoughts);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found."
        });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThoughtbyId(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        {
          new: true,
        }
      );

      if (!updatedThought) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }

      res.json({ message: `A new reaction has been added!` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No 'Thought' was found.",
        });
      } else if (thought.reactions.length === 0) {
        return res.status(404).json({
          message: "No 'Reaction' by that ID was found.",
        });
      } else {
        res.json({
          message: `Deletion of reaction was successful.`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;