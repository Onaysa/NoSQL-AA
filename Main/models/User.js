const { Schema, model } = require("mongoose");

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

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const User = model('User', UserSchema);
module.exports = User;
