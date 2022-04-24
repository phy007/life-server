const Base = require('../db/base');
const knex = require('../db/knex');

class Comment extends Base {
  constructor(props = 'comment') {
    super(props);
  }

  getCommentByRecordId (id) {
    return knex(this.table).join('user', 'user.userId', '=', 'comment.commentUserId').select('commentId', 'date', 'content', 'recordId', 'commentUserId', 'userName as username', 'image').where('recordId', '=', id).orderBy('date', 'asc')
  }
}

module.exports = new Comment()