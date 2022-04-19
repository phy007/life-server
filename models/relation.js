const Base = require('../db/base');
const knex = require('../db/knex');

class Relation extends Base {
  constructor(props = 'relation') {
    super(props);
  }

  getFriendId (params) {
    return knex(this.table).select('friendId').where(params)
  }
}
module.exports = new Relation()