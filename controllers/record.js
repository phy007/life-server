const Record = require('../models/record')
const Relation = require('../models/relation')
const Like = require('../models/like')
const Comment = require('../models/comment')
const Reply = require('../models/reply')
const commonWays = require('../middleware/common')
const User = require('../models/user')

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
      const friendIdList = await Relation.getFriendId({ ownId })
      let fIdArr = [], friRecord = [], friRecordArr = [], commentArr = []
      if (friendIdList.length) {
        for (const e of friendIdList) {
          // 查看权限
          const p = await User.getPower({ userId: e.friendId })
          if (p[0].power === '1') {
            // 根据朋友id获取记录
            fIdArr.push(e.friendId)
          }
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
            /* 主评论为一条，回复多条，根据每一条评论id，查询到回复，按时间降序获取它的所有回复，保存至每条评论的replys属性值 ，查询为空，不添加*/
            let c = [], comment
            if (comments.length) {
              for (const r of comments) {
                comment = r
                let reply = await Reply.getReplyById({ 'commentId': r.commentId })
                if (reply.length) {
                  comment.replys = reply
                }
                c.push(comment)
              }
            }
            commentArr.push(c)
          }
        }
      }
      res.status(200).send({ friRecord, commentsAndReplys: commentArr })
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
  },

  getRecordByRecordId: async (req, res) => {
    try {
      let result
      if (req.query.type === 'own') {
        result = await Record.getRecordByRecordId(req.query.recordId)
      } else {
        result = await Record.getRecordAndLikeByRecordId(req.query.recordId)
      }
      res.status(200).send(result[0])
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = recordController