const express = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;