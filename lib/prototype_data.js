var fs = require('fs');
var path = require('path');

var localJsonData = {
  "projects": "data/projects.json",
  "users": "data/users.json"
};

var prototypeData = {};

const dateFormat = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
var dateReviver = function (key, value) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

for (var key in localJsonData) {
  prototypeData[key] = JSON.parse(fs.readFileSync(path.join(__dirname, '../', localJsonData[key]), 'utf8'), dateReviver);
}

module.exports = prototypeData;
