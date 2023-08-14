const { Schema, model } = require('mongoose');

//Here, we establish a "Schema" defining our "User" "model". We have specific criteria for what constitutes a "User", including "username", "email", "thoughts" and "friends". We also use a "regex", in order to specifically test criteria for an acceptable email address, supplied by the user when they register.
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please fill a valid email address']
    },
    thoughts: [ {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
    } ]
    },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

//We export the "User" "Schema", so that it can be referenced in our "controllers/users.js" file, elsewhere in our app.
module.exports = User;