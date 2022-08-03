const iconType = require("../models/iconType")

const iconTypeController = {
  getAllIconList: async (req, res) => {
    try {
      const iconTypeData = await iconType.all()
      res.status(200).send(iconTypeData)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = iconTypeController;