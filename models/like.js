const Base = require('../db/base');
const knex = require('../db/knex');

class Like extends Base {
  constructor(props = 'like') {
    super(props);
  }

  getLikeByRecordId (id) {
    return knex(this.table).select().where('recordId', '=', id)
  }

  updateFavOrColById (id, param) {
    return knex(this.table).update(param).where('likeId', '=', id)
  }

  getLikesById (params) {
    if (params.collect) {
      return knex(this.table).select().where(params).orderBy('collectTime', 'asc')
    } else {
      return knex(this.table).select().where(params).orderBy('favoriteTime', 'asc')
    }
  }

  getColOrFarCount (params) {
    return knex(this.table).where(params).count('likeId as count')
  }
}

module.exports = new Like()