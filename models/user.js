const Base = require('../db/base');
const knex = require('../db/knex');

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'user') {
    super(props);
  }

  // by phone select user
  findPhone (phone) {
    return knex(this.table).where('phone', '=', phone)
  }

  // by id select user
  selectById (id) {
    return knex(this.table).where('userId', '=', id)
  }

  // rewrite
  update (id, params) {
    return knex(this.table).where('userId', '=', id).update(params);
  }

  exitOpenidAndKey (params) {
    return knex(this.table).where(params).select()
  }

  getUserImgById (id) {
    return knex(this.table).select('image').where('userId', '=', id)
  }

  getUserImgByUserName (username) {
    return knex(this.table).select('image').where('userName', '=', username)
  }

  getFriendsByIds (idArr) {
    return knex(this.table).select('userId', 'userName', 'image', 'power').whereIn('userId', idArr).orderBy('userName', 'asc')
  }

  getPower(params){
    return knex(this.table).select('power').where(params)
  }
}

module.exports = new User();
