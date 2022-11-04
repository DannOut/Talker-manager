const { readFile, writeFile } = require('fs').promises;

const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

const readFileFunc = async () => JSON.parse(await readFile(filePath));

const writeFileFunc = async (newId) => {
  const content = await readFileFunc();
  const updatedValue = JSON.stringify([...content, { ...newId }]);
  await writeFile(filePath, updatedValue, null);
};

const updateFileFunc = async (param) => {
  const updatedValue = JSON.stringify(param, null, 2);
  await writeFile(filePath, updatedValue);
};

const NextId = async () => {
  const content = await readFileFunc();
  const maxId = Math.max(...content.map(({ id }) => id));
  return maxId + 1;
};

const updateInfo = async (body, id) => {
  const content = await readFileFunc();
  const index = content.findIndex((element) => element.id === Number(id));
  content[index] = { id, ...body };
  await updateFileFunc(content);
};

const deleteInfo = async (id) => {
  const content = await readFileFunc();
  const index = content.findIndex((element) => element.id === Number(id));
  content.splice(index, 1);
  await updateFileFunc(content);
};

module.exports = {
  readFileFunc,
  writeFileFunc,
  NextId,
  updateInfo,
  deleteInfo,
};