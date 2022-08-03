const Base = require('../db/base')
const knex = require('../db/knex')

class BillType extends Base {
  constructor(props = 'billType') {
    super(props)
  }
  getBillTypeNameById (b) {
    return knex(this.table).where(Object.keys(b)[0], '=', Object.values(b)[0]).select('billTypeName')
  }
  update(bt){
    return knex(this.table).where('billTypeId', '=', bt.billTypeId).update({'billTypeName':bt.billTypeName});
  }

}

module.exports = new BillType()