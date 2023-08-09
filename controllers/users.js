const { User } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUsersById(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId });
      if (users.length === 0) {
        res
          .status(404)
          .json({
            message: "Something went wrong: User by that ID not found.",
          });
      } else {
        res.json(users);
      }
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
            message: "Something went wrong: User by that ID not found.",
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
      if (!userId) {
        return res
          .status(404)
          .json({
            message: "Something went wrong: User by that ID not found.",
          });
      }
      res.json({ message: `Deletion of user ${user} was successful.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "Something went wrong: User by that ID not found.",
          });
      }

      res.json({ message: `A new friend has been added for user ${user}!` });
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
        { $pull: { friend: { friendId: friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "Something went wrong: User by that ID not found.",
          });
      } else if (user.friends.length === 0) {
        return res
          .status(404)
          .json({
            message: "Something went wrong: Friend by that ID not found.",
          });
      } else {
        res.json({
          message: `Deletion of friend ${friendId} for user ${userId} was successful.`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
