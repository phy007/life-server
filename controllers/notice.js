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
      const result = await Notice.getNotice({ useredId: req.query.useredId })
      const l = await Notice.getNotHandle({ useredId: req.query.useredId, 'handleNotice': '0' })
      let arr = [[], [], [], []]
      if (result.length) {
        for (const v of result) {
          arr[v.type - 1].push(v)
        }
      }
      res.status(200).send({ arr, length: l[0].count })
    } catch (error) {
      console.log(error);
    }
  },
  updateNotice: async (req, res) => {
    try {
      const result = await Notice.updateNoticeById(req.query)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },
  handleNoticeById: async (req, res) => {
    try {
      const result = await Notice.updateNoticeById({ useredId: req.query.id, 'handleNotice': '0' })
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = noticeController