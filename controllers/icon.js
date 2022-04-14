const icon = require("../models/icon");

const iconController = {

  // 获取支出收入区域图标地址，标题，两表连接
  getShowIcon: async (req, res) => {
    try {
      const iconInfo = await icon.iconInfo()
      res.status(200).send(iconInfo)
    } catch (err) {
      res.status(400).send(err.sqlMessage)
      // res.json({ code: 0, message: '操作失败', data: err })
    }
  },

  // 添加分类
  addIcon: async (req, res) => {
    try {
      const re = /^[\u4e00-\u9fa5]{1,4}$/
      const data = req.body
      if (re.test(data.iconTitle) && data.iconTypeId !== '' && (data.type === 0 || data.type === 1)) {
        await icon.insert(req.body)
        res.json({ code: 1, message: 'success' })
      } else {
        res.json({ code: 2, message: '提交数据有误！' })
      }
    } catch (err) {
      res.json({ code: 0, message: '操作失败', data: err })
    }
  },

  // delete
  delIcon: async (req, res) => {
    try {
      await icon.deleteById(req.query.iconId)
      res.status(200).send({ message: 'success' })
    } catch (error) {
      res.status(400).send({ message: '操作失败', data: error })
    }
  }
}

module.exports = iconController;