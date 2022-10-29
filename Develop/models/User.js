const { Schema, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: "Username is Required",
    },

    emails: {
      type: String,
      required: true,
      default: '[/.+@.+\..+/]',
    },

    thoughts: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    friends: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = User;
