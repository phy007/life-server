const Base = require('../db/base')
const knex = require('../db/knex')

class Bill extends Base {
  constructor(props = 'bill') {
    super(props)
  }

  getBillsByUser (p) {
    return knex(this.table).where({ 'billTypeId': p.billTypeId, 'userId': p.userId }).orderBy('date', 'desc')
  }

  updateBillById (id, info) {
    return knex(this.table).where('billId', '=', id)
      .update(info)
  }

  getBillBydate (params) {
    return knex(this.table).select().where(params).orderBy('date', 'desc')
  }

  getBillById (params) {
    return knex(this.table).select().where(params)
  }
}

module.exports = new Bill()