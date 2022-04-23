const Comment = require('../models/comment')
const Reply = require('../models/reply')
const commonWays = require('../middleware/common')
const User = require('../models/user')

const commentController = {
  delComAndRepByCommentId: async (req, res) => {
    try {
      await Comment.delete(req.query)
      const replyId = Reply.existCommentId(req.query.commentId)
      if (replyId) {
        await Reply.delete(req.query)
      }
      res.status(200).send('success')
    } catch (error) {
      console.log(error);
    }
  },

  addComment: async (req, res) => {
    try {
      const result = await Comment.insert(req.body)
      if (result.length) {
        res.status(200).json({ id: result[0] })
      } else {
        res.status(204).send('fail')
      }
    } catch (error) {
      console.log(error);
    }
  },

  getCommentAndReplyByRecordId: async (req, res) => {
    try {
      const comment = await Comment.getCommentByRecordId(req.query.recordId)
      let replys = [], comments = []
      if (comment.length) {
        for (const c of comment) {
          let img = await User.getUserImgByUserName(c.username)
          if (img[0]) {
            c.userImage = img[0].image
          } else {
            c.userImage = ''
          }
          comments.push(c)
          // 主评论只有一条，回复可以有多条，避免数据处理不对，多表连接查询，在获取每一条回复的同时获取到该回复人的头像
          let reply = await Reply.getReplyAndUserImgById({ commentId: c.commentId })
          replys.push(reply)
        }
      }
      res.status(200).send({ comments, replys })
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = commentController