const { User } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUsersById(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId }).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: "No User by that ID was found." });
      } 
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUserById(req, res) {
    try {
      const user = await User.findOneAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      }
      res.json({ message: `Deletion of user '${user.username}' was successful.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const { friendId } = req.params;
      console.log("Request Body:", req.body); // Verify the friendId in the payload
      console.log("User ID:", req.params.userId);

      const userBeforeUpdate = await User.findOne({ _id: req.params.userId });
      console.log("User Before Update:", userBeforeUpdate);

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $addToSet: { friends: friendId },
          $inc: { friendCount: 1 }
        },
        { runValidators: true, new: true }
      );
      console.log("User After Update:", user);
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

  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: { friendId: friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "User by that ID not found.",
          });
      } else if (user.friends.length === 0) {
        return res
          .status(404)
          .json({
            message: "Friend by that ID not found.",
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

module.exports = userController;
