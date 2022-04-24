const Relation = require('../models/relation')
const commonWays = require('../middleware/common')

const relationController = {
  addRelation: async (req, res) => {
    try {
      const { ownId, friendId } = req.query
      let result
      r1 = await Relation.insert({ ownId, friendId })
      r2 = await Relation.insert({ 'friendId': ownId, 'ownId': friendId })
      if (r1 && r2) {
        result = 1
      }
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
  },
  delFriendsById: async (req, res) => {
    try {
      const result = await Relation.delete(req.query)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = relationController