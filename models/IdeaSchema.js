const {Schema, model} = require('mongoose');

const IdeaSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Idea', IdeaSchema);
