const bill = require('../models/bill')
const billController = {
  addBillRecord: async (req, res) => {
    try {
      await bill.insert(req.body)
      res.status(200).send({ message: 'success' })
    } catch (error) {
      res.status(400).send({ message: '操作失败', data: error })
    }
  },
  getBillsByUser: async (req, res) => {
    try {
      const billList = await bill.getBillsByUser(req.query)
      res.status(200).send(billList)
    } catch (error) {
      res.status(400).send({ message: '操作失败', data: error })
    }
  },
  delBillById: async (req, res) => {
    try {
      await bill.delete(req.query)
      res.status(200).send({ message: 'success' })
    } catch (error) {
      res.status(400).send({ message: 'fail', data: error })
    }
  },
  updateBillById: async (req, res) => {
    try {
      const { billId, addInfo } = req.body
      await bill.updateBillById(billId, addInfo)
      res.status(200).send({ message: '修改成功' })
    } catch (error) {
      res.status(400).send({ message: '操作失败', data: error })
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