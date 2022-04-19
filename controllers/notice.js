const Notice = require('../models/notice')
const commonWays = require('../middleware/common')

const noticeController = {
  addNotice: async (req, res) => {
    try {
      const result = await Notice.insert(req.body)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },
  delNotice: async (req, res) => {
    try {
      const result = await Notice.delete(req.body)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },
  getNotice: async (req, res) => {
    try {
      const result = await Notice.getNotice({ useredId: req.query.useredId, 'handleNotice': '0' })
      res.status(200).send(result)
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = noticeController