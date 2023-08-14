//Here, we require "models" "Thought" & "User", detailed in those files, within the "models" folder, found in our app's root folder.
const { User } = require("../models");

const { Thought } = require("../models");

//Here, we set delcare a "const" that will allow us to "Control" the various methods involved with "thoughts" in our app.
const userController = {

  //Here, we set-up a method to "getAllUsers", which "await"s a "json" "res"ponse, which contains the data we detailed in our "User".js "model". We include "err"or handling, should anything go awry in that process.
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we set-up a method to "get" single "UsersById", which "await"s a "json" "res"ponse, which contains the data we detailed in our "User".js "model", including more "err"or handling, including the "message" shown below, when a "User" with the specified "Id" is not found in the datbase.
  async getUsersById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: "No User by that ID was found." });
      } 
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we set-up a method to "create" a "User" using the "req"uest "body" data received. Our "err"or handling includes the "message" shown below, which returns when a specific "username" is not found in the datbase.
  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we set up a method to "update" an existing "User". "new: true" ensures that the "new" "User"name "return"s, the next time we search for this "User". We also include error-handling, in case the specified "Id" is not found in the datbase.
  async updateUserById(req, res) {
    try {
      const updatedFields =req.body;
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, updatedFields,
        { new: true }
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      }

      await Thought.updateMany(
        { username: user.username },
        {
            $set: {
            "thoughts.$[thought].username": user.username,
            "thoughts.$[thought].reactions.$[reaction].username": user.username,
          },
        },
        {
          arrayFilters: [
            { "thought.username": user.username },
            { "reaction.username": user.username },            
          ],
        }
      )
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //If a "User" is found, we can "delete" them "ById". We also include error-handling, in case the specified "Id" is not found in the datbase.
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ _id: userId }).populate('thoughts');
  
      if (!user) {
        return res.status(404).json({
          message: "User by that ID not found.",
        });
      }
  
      for (const thought of user.thoughts) {
        await Thought.findOneAndRemove({ _id: thought._id });
      }
  
      await User.findOneAndRemove({ _id: userId });
  
      res.json({
        message: `Deletion of user '${user.username}' and associated thoughts was successful.`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we set up a method to "add" a "Friend" to a "User". Our "runValidator" code here instructs that before adding the new "Friend", Mongoose will ensure that the "Friend" data adheres to the schema definition for "Friend"s, within the "User" "model" file. If any of the validation checks fail, Mongoose will "return" an error and the "catch" handles it. "new: true" ensures that the "new" "friendId" "return"s, the next time we search for this "User". We also include more error-handling, in case the specified "Thought" is not found in the datbase (and therefore, cannot be "reacted-to").
  async addFriend(req, res) {
    try {
      const { friendId } = req.params;

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $addToSet: { friends: friendId },
          $inc: { friendCount: 1 }
        },
        { runValidators: true, new: true }
      );
    
      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      }

      res.json({ message: `A new friend has been added for user '${user.username}'!` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Here, we establish a method to "delete" a "Friend" from a given "User"'s "friend" list. Also, the "friendCount" is decremented each time this happens. We've built in "err"or handling, just in case.
  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId }, $inc: { friendCount: -1 } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      } else {
        res.json({
          message: `Deletion of friend '${friendId}' for user '${userId}' was successful.`
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//Finally, we "export" all functionality above, so that it can utilized by the "routes/api-routes/user-routes file", elsewhere in our app.
module.exports = userController;
