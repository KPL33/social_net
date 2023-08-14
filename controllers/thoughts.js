//Here, we require "models" "Thought" & "User", detailed in those files, within the "models" folder, found in our app's root folder.
const { Thought, User } = require("../models");

//Here, we set delcare a "const" that will allow us to "Control" the various methods involved with "thoughts" in our app.
const thoughtController = {

  //Here, we set-up a method to "getAllThoughts", which "await"s a "json" "res"ponse, which contains the data we detailed in our "Thought".js "model". We include "err"or handling, should anything go awry in that process.
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we set-up a method to "get" single "ThoughtsById", which "await"s a "json" "res"ponse, which contains the data we detailed in our "Thought".js "model", including more "err"or handling, including the "message" shown below, when a "Thought" with the specified "Id" is not found in the datbase.
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

  //Here, we set-up a method to "create" a "Thought" using the "req"uest "body" data received. It is "req"uired to contain a "username" and "addTo" the "Set" of "thoughts" that may already exist for the specified user. It also instructs that the "thought" "Set" should include the "new" "thought". Our "err"or handling includes the "message" shown below, which returns when a specific "username" is not found in the datbase.
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
          message: "User not found.",
        });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //If a "Thought" is found, we can "delete" it "ById". We also include error-handling, in case the specified "Id" is not found in the datbase.
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

  //Here, we set up a method to "update" an existing "Thought". "new: true" ensures that the "new" "Thought" "return"s, the next time we search for this "Thought". We also include error-handling, in case the specified "Id" is not found in the datbase.
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

    //Here, we set up a method to "create" a "reaction" to a "Thought". Our "runValidator" code here instructs that before adding the new "reaction", Mongoose will ensure that the "reaction" data adheres to the schema definition for "reaction"s, within the "Thought" "model" file. If any of the validation checks fail, Mongoose will "return" an error and the "catch" handles it. "new: true" ensures that the "new" "reaction" "return"s, the next time we search for this "Thought". We also include more error-handling, in case the specified "Thought" is not found in the datbase (and therefore, cannot be "reacted-to").
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

  //Similar to the "deleteThought" function, here we give ourselves a way to "delete" "Reaction"s.
  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
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
          message: "Deletion of reaction was successful.",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//Finally, we "export" all functionality above, so that it can utilized by the "routes/api-routes/thought-routes file", elsewhere in our app.
module.exports = thoughtController;
