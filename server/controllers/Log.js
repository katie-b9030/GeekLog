const models = require('../models');

const { Media } = models;

const makerPage = (req, res) => res.render('app', { name: req.session.account.name });

const logPage = (req, res) => res.render('app', { name: req.session.account.name });

const makeMedia = async (req, res) => {
  if (!req.body.title || !req.body.format) {
    return res
      .status(400)
      .json({ error: 'Both title and media type are required' });
  }

  const mediaData = {
    title: req.body.title,
    format: req.body.format,
    favoriteCharacters: req.body.favoriteCharacters
      ? req.body.favoriteCharacters
      : 'empty',
    comments: req.body.comments ? req.body.comments : 'empty',
    owner: req.session.account._id,
  };

  try {
    const newMedia = new Media(mediaData);
    await newMedia.save();
    return res.status.json({
      title: newMedia.title,
      format: newMedia.format,
      favoriteCharacters: newMedia.favoriteCharacters,
      comments: newMedia.comments,
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

const getMedia = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Media.find(query).select('title format').lean().exec();

    return res.json({ media: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving media!' });
  }
};

module.exports = {
  makerPage,
  logPage,
  makeMedia,
  getMedia,
};
