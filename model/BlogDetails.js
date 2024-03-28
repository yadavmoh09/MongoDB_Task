const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

// Define comment schema
const commentSchema = new Schema({
  comment_id: {
    type: String,
    default: () => uuidv4(),
  },
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

// Define post schema
const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    media_location: {
      type: [String],
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  location: {
    type: String,
    required: false,
  },
  author_id: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    required: false,
  },
  comments: [commentSchema],
});

// Define schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  security_question: {
    type: String,
    required: true,
  },
  security_answer: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  interested_in: {
    type: [String],
    required: true,
  },
  user_location: {
    type: String,
    required: false,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

// Export each schema as a Mongoose model
const Comment = mongoose.model("Comment", commentSchema);
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Comment, Post, User };
