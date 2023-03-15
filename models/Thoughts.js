const { Schema, model } = require('mongoose');
// imports reactions to use as a subdocument inside our thoughts model
const reactionSchema = require('./Reactions');

const thoughtsSchema = new Schema(
  {
    thoughtText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    username: { type: String, required: true },
    userId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function formatDate(createdAt) {
  return (createdAt = new Date().toLocaleDateString());
}

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;
