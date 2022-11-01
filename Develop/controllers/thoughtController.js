const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts
    getAllThought(req, res) {
        Thought.find()
          .then((Thought) => res.json(Thought))
          .catch((err) => res.status(500).json(err));
      },
 // Create a course
 createUser(req, res) {
    User.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

   // Delete user
   deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },














};