const Base = require('../db/base');
const knex = require('../db/knex');

class Relation extends Base {
  constructor(props = 'relation') {
    super(props);
  }

  getFriendId (id) {
    return knex(this.table).select('friendId').where('ownId', '=', id)
  }
}
module.exports = new Relation()