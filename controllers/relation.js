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
  }
}
module.exports = relationController