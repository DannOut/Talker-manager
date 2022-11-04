const talkValidation = (param, res, value) => {
  if (!param && param !== 0) {
    return res.status(400).json({
      message: `O campo "${value}" é obrigatório`,
    });
  }
};

const ratingValidation = (param, res) => {
  if (param < 1 || param > 5 || !Number.isInteger(param)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
};

module.exports = (req, res, next) => {
  const { talk } = req.body;
  return talkValidation(talk, res, 'talk')
  || talkValidation(talk.rate, res, 'rate')
  || talkValidation(talk.watchedAt, res, 'watchedAt')
  || ratingValidation(talk.rate, res)
  || next();
};