// Subproject specific Jest config
const base = require('../../../jest.config.base.js');
const pack = require('./package.json');

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
};
