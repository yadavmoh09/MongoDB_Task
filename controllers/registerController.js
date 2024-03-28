const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Load the schema definition
const blogDetailSchema = require("../model/BlogDetails");

// Middleware to set updateDate before saving
const setUpdateDate = (req, res, next) => {
  req.body.updateDate = new Date();
  next();
};

// Route to create users, posts, and categories
const createDocuments = async (req, res) => {
  try {
    const { users, posts, categories } = req.body;
    if (users) {
      if (!users.username || !users.password)
        return res
          .status(400)
          .json({ message: "Username and password are required." });

      const duplicate = await blogDetailSchema.User.findOne({
        username: users.username,
      }).exec();
      if (duplicate)
        return res.status(409).json({ message: "username already defined" });

      const result = blogDetailSchema.User.create({
        username: users.username,
        email: users.email,
        security_question: users.security_question,
        security_answer: users.security_answer,
        phone_number: users.phone_number,
        interested_in: users.interested_in,
        user_location: users.user_location,
        password: users.password,
      });
    }

    // Create posts
    if (posts && Array.isArray(posts)) {
      // Iterate over each post asynchronously
      await Promise.all(
        posts.map(async (post) => {
          // Create each post
          try {
            // Use findOne to find a user by username
            const user = await blogDetailSchema.User.findOne({
              username: post.username,
            });
            if (user === null) {
              throw new Error("User is not available...");
            }
            await blogDetailSchema.Post.create({
              username: post.username,
              title: post.title,
              content: post.content,
              location: post.location,
              author_id: post.author_id,
              tags: post.tags,
              comments: post.comments,
            });
          } catch (error) {
            console.error("Error finding user by username:", error);
            throw error; // Throw the error for handling elsewhere
          }
        })
      );
    }

    res.status(201).send("Documents created successfully");
  } catch (error) {
    console.error("Error creating documents:", error);
    res.status(400).send("Error creating documents");
  }
};

// Apply middleware to set updateDate before sav
module.exports = { setUpdateDate, createDocuments };
