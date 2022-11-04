const talkValidation = (param, res, value) => {
  if (!param && param !== 0) {
    return res.status(400).json({
      message: `O campo "${value}" é obrigatório`,
    });
  }
};

const dateValidation = (param, res) => {
  const isFormateDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!isFormateDate.test(param)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
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
  talkValidation(talk, res, 'talk');
  talkValidation(talk.rate, res, 'rate');
  talkValidation(talk.watchedAt, res, 'watchedAt');
  dateValidation(talk.watchedAt, res);
  ratingValidation(talk.rate, res);

  next();
};