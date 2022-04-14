const iconType = require("../models/iconType")

const iconTypeController = {
  getAllIconList: async (req, res) => {
    try {
      const iconTypeData = await iconType.all()
      res.status(200).send(iconTypeData)
    } catch (err) {
      res.status(400).send({message: '操作失败', data: err })
    }
  }
}

module.exports = iconTypeController;