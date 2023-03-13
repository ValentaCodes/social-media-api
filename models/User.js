const { Schema, model } = require('mongoose');

// Create Schema for User
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 25,
      minLength: 1,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\../,
    },
    thoughts: { type: Schema.Types.Array, ref: 'thought' },
    friends: {
      type: Schema.Types.Array,
      ref: 'user',
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Creates a virtual allowing us to track the amount of friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
