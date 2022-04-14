const Base = require('../db/base');
const knex = require('../db/knex');

class Comment extends Base {
  constructor(props = 'comment') {
    super(props);
  }

  getCommentByRecordId (id) {
    return knex(this.table).where('recordId', '=', id).orderBy('date', 'asc')
  }
}

module.exports = new Comment()