const knex = require('./knex');

class Base {
  constructor(props) {
    this.table = props;
  }

  // 查找
  all () {
    return knex(this.table).select();
  }

  // 新增
  insert (params) {
    return knex(this.table).insert(params);
  }

  // 更改
  update (id, params) {
    return knex(this.table).where('id', '=', id).update(params);
  }

  // 删除
  delete (obj) {
    return knex(this.table).where(Object.keys(obj)[0], '=', Object.values(obj)[0]).del();
  }

}

module.exports = Base;
