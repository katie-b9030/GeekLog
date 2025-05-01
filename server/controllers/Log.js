const models = require('../models');

const { Media } = models;

const makerPage = (req, res) => res.render('app', { page: 'maker', name: req.session.account.name });

// const updatePage = (req, res) =>
// res.render("app", { page: "update", name: req.session.account.name });

const logPage = (req, res) => res.render('app', { page: 'log', name: req.session.account.name });

const notFoundPage = (req, res) => res.status(404).render('app', { page: 'notFound' });

const makeMedia = async (req, res) => {
  if (!req.body.title || !req.body.format) {
    return res
      .status(400)
      .json({ error: 'Both title and media type are required' });
  }

  const mediaData = {
    title: req.body.title,
    format: req.body.format,
    favoriteCharacters: req.body.favoriteCharacters,
    comments: req.body.comments,
    rating: req.body.rating,
    owner: req.session.account._id,
  };

  try {
    const newMedia = new Media(mediaData);
    await newMedia.save();
    return res.status(201).json({
      title: newMedia.title,
      format: newMedia.format,
      favoriteCharacters: newMedia.favoriteCharacters,
      comments: newMedia.comments,
      rating: newMedia.rating,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Media already exists!' });
    }
    return res
      .status(500)
      .json({ error: 'An error occured making the media!' });
  }
};

/* const updateMedia = async (req, res) => {
  if (!req.body.title) {
    return res
      .status(400)
      .json({ error: "Title selection is required to update media" });
  }

  const mediaData = {
    title: req.body.title,
    format: req.body.format,
    favoriteCharacters: req.body.favoriteCharacters,
    comments: req.body.comments,
    rating: req.body.rating,
    owner: req.session.account._id,
  };

  try {
    const foundMedia = await Log.findById(title);
    if (!foundMedia) return res.status(404).json({ error: "Media not found!" });

    foundMedia.favoriteCharacters = favoriteCharacters;
    foundMedia.comments = comments;
    foundMedia.rating = rating;

    await foundMedia.save();

    return res.status(200).json({ message: "Media successfully updated!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occured updating the media!" });
  }
}; */

const getMedia = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Media.find(query).lean().exec();

    return res.json({ media: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving media!' });
  }
};

module.exports = {
  makerPage,
  // updatePage,
  logPage,
  notFoundPage,
  makeMedia,
  // updateMedia,
  getMedia,
};
