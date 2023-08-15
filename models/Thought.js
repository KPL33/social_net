const { Schema, model } = require('mongoose');

//Here, we point to a sub-document "reactionSchema", so that our "Thought" "Schema" can get instructions on how to handle "reaction"s to "thought"s.
const reactionSchema = require('./Reaction');

//Here, we establish a "Schema" defining our "Thought" "model". We have specific criteria for what constitutes a "Thought", including the "thought" (comment) itself, a "createdAt" timestamp for the "thought", formatted by JavaScript's native "Date" object, the poster's "username" and expectation of "reactions" to each "thought".
const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString('en-us')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

//Here, we set ourselves a Mongoose "virtual" obejct, which will keep track of how many "reactions" a given "thought" receives.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//We export this "Thought" "Schema", so that it can be referenced in our "controllers/thoughts.js" file, elsewhere in our app.
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
