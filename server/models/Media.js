const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  format: {
    type: String,
    required: true,
  },
  favoriteCharacters: {
    type: String,
    default: 'empty',
  },
  comments: {
    type: String,
    default: 'empty',
  },
  rating: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

MediaSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  format: doc.format,
  favoriteCharacters: doc.favoriteCharacters,
  comments: doc.comments,
  rating: doc.rating,
});

// // asked ChatGPT for assistance preventing duplicates
// MediaSchema.index({ title: 1, format: 1, owner: 1 }, { unique: true });

const MediaModel = mongoose.model('Media', MediaSchema);
module.exports = MediaModel;
