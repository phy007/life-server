const Base = require('../db/base');
const knex = require('../db/knex');

class IconType extends Base {
  constructor(props = 'icontype') {
    super(props);
  }
}

module.exports = new IconType();
