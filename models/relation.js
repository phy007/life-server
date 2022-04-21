const Base = require('../db/base');
const knex = require('../db/knex');

class Relation extends Base {
  constructor(props = 'relation') {
    super(props);
  }
  getFriendId (params) {
    return knex(this.table).select('friendId').where(params)
  }
  getFriendsByOwnId (params) {
    return knex(this.table).join('user', 'user.userId', '=', 'relation.friendId').select('friendId', 'remark', 'userName', 'image', 'power').where(params)
  }
  updateRemark (params, data) {
    return knex(this.table).update(data).where(params)
  }
}
module.exports = new Relation()