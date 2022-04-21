const Relation = require('../models/relation')
const commonWays = require('../middleware/common')

const relationController = {
  addRelation: async (req, res) => {
    try {
      const result = await Relation.insert(req.query)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },
  updateRemark: async (req, res) => {
    try {
      const data = req.body
      const result = await Relation.updateRemark({ 'ownId': data.ownId, 'friendId': data.friendId }, { 'remark': data.remark })
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = relationController