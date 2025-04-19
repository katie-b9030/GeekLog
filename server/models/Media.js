const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  format: {
    type: String,
    required: true,
  },
  favoriteCharacters: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

MediaSchema.statics.toApi = (doc) => ({
  title: doc.title,
  format: doc.format,
  favoriteCharacters: doc.favoriteCharacters,
  comments: doc.comments,
});

const MediaModel = mongoose.model('Media', MediaModel);
module.exports = MediaModel;
