const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
            default: 'Thought is Required',
        },

        createdAt: {
            type: Date,
            default: Date.now,
          },

          username: {
            type: String,
            required: true,
          },

    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;