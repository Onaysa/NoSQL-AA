const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../Main/models");

module.exports = {
  // Get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Get one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      });
    select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json({
              userData,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
     { _id: req.params.userId },
     { $set: req.body },
     { runValidators: true, new: true},
     
      )
    
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.deleteMany({ _id: { $in: req.params.userId } })
      )
      .then(() =>
        !Thought
          ? res.json({ message: "user successfully deleted" })
          : res.json(userData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};


