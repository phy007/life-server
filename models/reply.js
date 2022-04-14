const Base = require('../db/base');
const knex = require('../db/knex');

class Reply extends Base {
  constructor(props = 'reply') {
    super(props);
  }

  getReplyById (params) {
    return knex(this.table).where(params).orderBy('replyDate', 'asc')
  }

  existCommentId (id) {
    return knex(this.table).select('commentId').where('commentId', '=', id)
  }

  getReplyAndUserImgById (params) {
    return knex(this.table).join('user', 'user.userId', '=', 'reply.userId').select('replyId', 'commentId', 'reply.userName', 'replyContent', 'replyDate', 'reply.userId', 'repliedUserName', 'user.image').where(params)
  }
}

module.exports = new Reply()