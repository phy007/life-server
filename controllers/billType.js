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
      console.log(error)
    }
  },
  delBillTypeById: async (req, res) => {
    try {
      await billType.delete(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      console.log(error)
    }
  },
  updateBTNameById: async (req, res) => {
    try {
      await billType.update(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      console.log(error)
    }
  },
  addBTNameByName: async (req, res) => {
    try {
      await billType.insert(req.query)
      res.json({ code: 1, message: 'success' })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = billTypeController