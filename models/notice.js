const Base = require('../db/base');
const knex = require('../db/knex');

class Notice extends Base {
  // 定义参数默认值为 notice 表
  constructor(props = 'notice') {
    super(props);
  }

  getNotice (params) {
    return knex(this.table).join('user', 'user.userId', '=', 'notice.userId').select('userName', 'image', 'noticeId', 'type', 'dateTime', 'noticeCotent', 'recordId', 'friendId', 'handleNotice', 'handleApply').where(params).groupBy('type').orderBy('dateTime', 'asc')
  }

  getNotHandle (params) {
    return knex(this.table).count('noticeId as count').where(params)
  }

  updateNoticeById (params) {
    return knex(this.table).update('handleNotice', '1').where(params)
  }
}

module.exports = new Notice();
