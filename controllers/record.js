const Record = require('../models/record')
const Relation = require('../models/relation')
const Like = require('../models/like')
const Comment = require('../models/comment')
const Reply = require('../models/reply')
const commonWays = require('../middleware/common')

const recordController = {
  getOwnRecords: async (req, res) => {
    try {
      const ownId = req.query.userId
      const record = await Record.getRecordByOwnId(ownId)
      res.status(200).send({ ownRecord: record })
    } catch (error) {
      console.log(error);
    }
  },

  getFriRecords: async (req, res) => {
    try {
      const ownId = req.query.userId
      // 根据本人id获取朋友id
      const friendIdList = await Relation.getFriendId(ownId)
      let fIdArr = [], friRecord = [], friRecordArr = [], commentArr = [], replyArr = []
      if (friendIdList.length) {
        for (const e of friendIdList) {
          // 根据朋友id获取记录
          fIdArr.push(e.friendId)
        }
        friRecordArr = await Record.getRecordByFriendId(fIdArr)
        if (friRecordArr.length) {
          for (const e of friRecordArr) {
            // 根据对应记录id获取like表中内容，并添加至相对应记录详情后面
            // 根据对应记录id获取comment表中评论的内容
            // 根据对应评论id获取reply表中回复的内容
            let obj = e
            let l = await Like.getLikeByRecordId(e.recordId)
            if (l.length) {
              obj.likeId = l[0].likeId
              obj.collect = l[0].collect
              obj.favorite = l[0].favorite
            } else {
              obj.likeId = 0
              obj.collect = '0'
              obj.favorite = '0'
            }
            friRecord.push(obj)
            let comments = await Comment.getCommentByRecordId(e.recordId)
            if (comments.length) {
              for (const r of comments) {
                let reply = await Reply.getReplyById({ 'commentId': r.commentId})
                replyArr.push(reply)
              }
            }
            commentArr.push(comments)
          }
        }
      }
      res.status(200).send({ friRecord, comments: commentArr, replys: replyArr })
    } catch (error) {
      console.log(error);
    }
  },

  delRecordById: async (req, res) => {
    try {
      const result = await Record.delete(req.query)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },

  updateRecordById: async (req, res) => {
    try {
      const result = await Record.update(req.body.recordId, req.body.params)
      commonWays.sendData(result, res)
    } catch (error) {
      console.log(error);
    }
  },

  addRecord: async (req, res) => {
    try {
      let result = await Record.insert(req.body)
      commonWays.sendData(result, res)
    } catch (error) {
      // console.log(error);
    }
  }
}
module.exports = recordController