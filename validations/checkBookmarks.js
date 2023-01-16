const checkName = (req, res, next) => {
  console.log('checkname');
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
};

const checkBoolean = (req, res, next) => {
  console.log('checkboolean');
  const { is_favorite } = req.body;
  console.log(is_favorite, typeof is_favorite);
  if (
    is_favorite === true ||
    is_favorite === false ||
    is_favorite === undefined
  ) {
    next();
  } else {
    res.status(400).json({ error: 'is_favorite must be a boolean value' });
  }
};

const validateURL = (req, res, next) => {
  console.log('checkURL');
  if (
    req.body.url.substring(0, 7) === 'http://' ||
    req.body.url.substring(0, 8) === 'https://'
  ) {
    return next();
  } else {
    res
      .status(400)
      .json({ error: `You forgot to start your url with http:// or https://` });
  }
};

module.exports = { checkBoolean, checkName, validateURL };
