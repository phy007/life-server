const billType = require('../models/billType')
const billTypeController = {
  getBillTypeNameById: async (req, res) => {
    try {
      const name = await billType.getBillTypeNameById(req.query)
      res.status(200).send(name)
    } catch (error) {
      res.json({ message: 'fail' })
    }
  },
  getBillType: async (req, res) => {
    try {
      const result = await billType.all()
      res.json({ code: 1, message: 'success', data: result })
    } catch (error) {
      res.json({ code: 0, message: '获取数据失败', data: error.sqlMessage })
    }
  },
  delBillTypeById: async (req, res) => {
    try {
      await billType.delete(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      res.json({ code: 0, message: '删除失败', data: error.sqlMessage })
    }
  },
  updateBTNameById: async (req, res) => {
    try {
      await billType.update(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      res.json({ code: 0, message: '获取数据失败', data: error.sqlMessage })
    }
  },
  addBTNameByName: async (req, res) => {
    try {
      await billType.insert(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      res.json({ code: 0, message: '获取数据失败', data: error.sqlMessage })
    }
  }
}
module.exports = billTypeController