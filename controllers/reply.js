const Reply = require('../models/reply')
const commonWays = require('../middleware/common')

const replyController = {
  addReply: async (req, res) => {
    try {
      const result = await Reply.insert(req.body)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },

  delReply: async (req, res) => {
    try {
      const result = await Reply.delete(req.query)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = replyController