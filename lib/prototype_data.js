const fs = require('fs');
const path = require('path');

const localJsonData = {
  activity: 'data/activity.json',
  models: 'data/models.json',
  projects: 'data/projects.json',
  users: 'data/users.json',
};

const prototypeData = {};

const dateFormat = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
const dateReviver = (key, value) => {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

localJsonData.forEach((key) => {
  prototypeData[key] = JSON.parse(fs.readFileSync(path.join(__dirname, '../', localJsonData[key]), 'utf8'), dateReviver);
});

module.exports = prototypeData;
