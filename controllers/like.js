const Like = require('../models/like')
const Record = require('../models/record')
const commonWays = require('../middleware/common')
const LikeController = {
  updateFavOrColById: async (req, res) => {
    try {
      const { id, favorite, collect, collectTime, favoriteTime } = req.body
      const result = await Like.updateFavOrColById(id, { favorite, collect, collectTime, favoriteTime })
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error)
    }
  },
  addLike: async (req, res) => {
    try {
      const result = await Like.insert(req.body)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error)
    }
  },
  getLikesById: async (req, res) => {
    try {
      const recordIdList = await Like.getLikesById(req.query)
      let result = []
      if (recordIdList.length) {
        for (const r of recordIdList) {
          let record = await Record.getRecordByRecordId(r.recordId)
          if (req.query.collect) {
            record[0].likeTime = r.collectTime
          } else {
            record[0].likeTime = r.favoriteTime
          }
          result.push(record[0])
        }
      }
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
    }
  },
  getColAndFarCountByRecordId: async (req, res) => {
    try {
      const collect = await Like.getColOrFarCount(req.query, { collect: '1' })
      const favorite = await Like.getColOrFarCount(req.query, { favorite: '1' })
      res.status(200).send({ collect: collect[0].count, favorite: favorite[0].count })
    } catch (error) {
      console.log(error)
    }
  },
  getColAndFavByUserId: async (req, res) => {
    try {
      const collects = await Like.getColOrFarTop4ByUserId({ 'like.userId': req.query.userId, 'collect': '1' })
      const favorites = await Like.getColOrFarTop4ByUserId({ 'like.userId': req.query.userId, 'favorite': '1' })
      res.status(200).send({ collects, favorites })
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = LikeController
