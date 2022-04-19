const Base = require('../db/base');
const knex = require('../db/knex');

class Notice extends Base {
  // 定义参数默认值为 notice 表
  constructor(props = 'notice') {
    super(props);
  }

  getNotice (params) {
    return knex(this.table).select().where(params)
  }

}

module.exports = new Notice();
