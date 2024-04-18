const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Book = require('../models/book.model');


/**
 * Represents a user in the Pageturn application.
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} fullName - The full name of the user.
 * @property {Date} [dateOfBirth] - The date of birth of the user (optional).
 * @property {string} [gender] - The gender of the user ('male', 'female', 'other').
 * @property {string} [country] - The country of the user.
 * @property {string[]} [interests] - The interests selected by the user from predefined tags.
 * @property {string} [bio] - The biography or description of the user.
 * @property {string} [profilePicture] - The URL of the user's profile picture.
 * @property {string[]} wantToRead - Array of book IDs the user wants to read.
 * @property {string[]} currentlyReading - Array of book IDs the user is currently reading.
 * @property {string[]} read - Array of book IDs the user has read.
 * @property {Date} createdAt - The date when the user account was created.
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    maxlength: 100
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Please provide a valid date of birth'
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  country: {
    type: String
    // You can add validation or enum here if you want to restrict to predefined countries
  },
  interests: [{
    type: String
    // You can add validation or enum here if you want to restrict to predefined tags
  }],
  bio: {
    type: String,
    maxlength: 1000
  },
  profilePicture: {
    type: String
  },
  wantToRead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  currentlyReading: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  read: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
