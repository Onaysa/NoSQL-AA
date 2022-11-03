const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
 //Get one user by id
 getUserById(req, res) {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .then((thoughtData) =>
      !thoughtData
        ? res.status(404).json({ message: "No thought found with that ID" })
        : res.json({
            thoughtData,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},



 // Create a Thought
 createThought( req, res) {
  Thought.create(req.body)
    .then(( _id ) => {
      return Thought.findOneAndUpdate(
        { _id: req.params.userId},
        { $push: { thoughts: _id } },
        { new: true },
      );
    })
    .then((thoughtData) => 
    !thoughtData 
      ? res.status(404).json({
          message: 'Thought created, but no user found',
        })
      : res.json({ message: 'Thought successfully created' })
  )
    .catch((err) => res.status(500).json(err));
},
// Update Thought by id
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thoughtData) =>
      !thoughtData
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thoughtData)
    )
    .catch((err) => res.status(500).json(err));
},

   // Delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No such thought exists with this ID' })
          : Thought.findOneAndUpdate(
             
              { _id: { $in: req.params.userId } },
              { new: true },
        
            )
      )
      .then(() =>
        !thoughtData
          ? res.status(404).json({
              message: 'Thought created, but no user found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Add reaction
addReaction(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactionss: { reactionId: req.params.reactionId } } },
)
.then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
},

// Delete reaction
removeReaction(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactionss: { reactionId: req.params.reactionId } } },
)
.then(() => res.json({ message: 'User and associated thoughts deleted' }))
.catch((err) => res.status(500).json(err));


  },
};