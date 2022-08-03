const bill = require('../models/bill')
const billController = {
  addBillRecord: async (req, res) => {
    try {
      await bill.insert(req.body)
      res.status(200).send({ message: 'success' })
    } catch (error) {
      console.log(error)
    }
  },
  getBillsByUser: async (req, res) => {
    try {
      const billList = await bill.getBillsByUser(req.query)
      res.status(200).send(billList)
    } catch (error) {
      console.log(error)
    }
  },
  delBillById: async (req, res) => {
    try {
      await bill.delete(req.query)
      res.status(200).send({ message: 'success' })
    } catch (error) {
      console.log(error)
    }
  },
  updateBillById: async (req, res) => {
    try {
      const { billId, addInfo } = req.body
      await bill.updateBillById(billId, addInfo)
      res.status(200).send({ message: '修改成功' })
    } catch (error) {
      console.log(error)
    }
  },
  getBillBydate: async (req, res) => {
    try {
      const result = await bill.getBillBydate(req.query)
      console.log(result);
      res.status(200).send(result)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = billController