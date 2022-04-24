const Base = require('../db/base');
const knex = require('../db/knex');

class Record extends Base {
  constructor(props = 'record') {
    super(props);
  }

  // methods
  getRecordByOwnId (id) {
    return knex(this.table).where('record.userId', '=', id).orderBy('time', 'desc')
  }

  getRecordByFriendId (idArr) {
    return knex(this.table).join('user', 'user.userId', '=', 'record.userId').select('userName', 'recordId', 'recordText', 'recordImage', 'record.userId', 'time').whereIn('record.userId', idArr).orderBy('time', 'desc')
  }

  update (id, params) {
    return knex(this.table).where('recordId', '=', id).update(params);
  }

  getRecordByRecordId (id) {
    return knex(this.table).where('recordId', '=', id)
  }

  getRecordAndLikeByRecordId (id) {
    return knex(this.table).join('like', 'like.recordId', '=', 'record.recordId').select('likeId', 'favorite', 'collect', 'record.recordId', 'recordText', 'recordImage', 'record.userId', 'time').where('record.recordId', '=', id)
  }

}

module.exports = new Record()