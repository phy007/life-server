const Base = require('../db/base');
const knex = require('../db/knex');

class Record extends Base {
  constructor(props = 'record') {
    super(props);
  }

  // methods
  getRecordByOwnId (id) {
    return knex(this.table).where('userId', '=', id).orderBy('time', 'desc')
  }

  getRecordByFriendId (idArr) {
    return knex(this.table).select().whereIn('userId', idArr).orderBy('time', 'desc')
  }

  update (id, params) {
    return knex(this.table).where('recordId', '=', id).update(params);
  }

  getRecordByRecordId (id) {
    return knex(this.table).where('recordId', '=', id)
  }

}

module.exports = new Record()