const { Schema, Types } = require('mongoose');

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