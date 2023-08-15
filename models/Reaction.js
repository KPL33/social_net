//Here, we "require" necessary components "Schema" and "Types", native to "mongoose".
const { Schema, Types } = require('mongoose');

//Here we define a "reaction". We give each a unique "Id", establish that we require a "Body" comment (in the form of a "String"), with a max-lenght of 280 characters. Similar to our "Thought" "model", we also timestampe our "reactions" to "thoughts."
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString('en-us')
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

//We export the "Reaction" "Schema", so that it can be referenced in our "controllers/thoughts.js" file, elsewhere in our app.
module.exports = reactionSchema;