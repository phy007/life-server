const Base = require('../db/base');
const knex = require('../db/knex');

class Icon extends Base {
  // 定义参数默认值为 icon 表
  constructor(props = 'icon') {
    super(props);
  }

  iconInfo () {
    return knex('icon').join('icontype', 'icon.iconTypeId', '=', 'icontype.iconTypeId').where('isdelete','=',0).select('icon.iconId', 'icon.iconTitle', 'icontype.iconTypeUrl', 'icon.type')
  }

  deleteById(id){
    return knex('icon').where('iconId','=',id).update({'isdelete':'1'})
  }
}

module.exports = new Icon();
