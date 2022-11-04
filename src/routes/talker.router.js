const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateName = require('../middlewares/validateName');
const validateToken = require('../middlewares/validateToken');
const validateDate = require('../middlewares/validateDate');
const handlers = require('../utils/handlersJson');

const router = express.Router();

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const content = await handlers.readFileFunc();
  if (q) {
    const filteredInfo = content.filter(({ name }) => name.includes(q));
    return res.status(200).json(filteredInfo);
  }
});

router.get('/:id', async (req, res) => {
  const paramId = req.params.id;
  const content = await handlers.readFileFunc();
  const searchId = content.find(({ id }) => Number(id) === Number(paramId));
  if (!searchId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(searchId);
});

router.get('/', async (_req, res) => {
  const content = await handlers.readFileFunc();
  res.status(200).json(content);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  async (req, res) => {
    const content = req.body;
    const newContent = { id: await handlers.NextId(), ...content };
    await handlers.writeFileFunc(newContent);
    res.status(201).json(newContent);
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  async (req, res) => {
    const { id } = req.params;
    const personInfo = req.body;
    const teste = { id: Number(id), ...personInfo };
    await handlers.updateInfo(teste, id);
    res.status(200).json(teste);
  },
);

router.delete(
  '/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    await handlers.deleteInfo(Number(id));
    res.sendStatus(204);
  },
);

module.exports = router;