const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const iconController = require('../controllers/icon');
const iconTypeController = require('../controllers/iconType');
const billController = require('../controllers/bill');
const billTypeController = require('../controllers/billType');
const recordController = require('../controllers/record')
const likeController = require('../controllers/like')
const commentController = require('../controllers/comment')
const replyController = require('../controllers/reply')

const auth = require("../middleware/auth");
const file = require('../middleware/upload')
const multer = require('multer')

// 文件上传
router.post('/upload', multer({ dest: './static/uploads/' }).any(), file.upload)
// 图片下载
router.get('/downImg', file.down)
// 删除文件
router.get('/delImg', file.del)

// user
// register
router.post("/register", userController.register);
router.get('/existUser', userController.existUser)
// login
router.get("/wxlogin", userController.wxlogin);
router.post("/login", userController.login);
// create code
router.get('/code', userController.createCode)
router.post('/updateUser', userController.updateUser)

router.get('/getUser', auth, userController.getUserById)
router.post('/updateUser', userController.updateUserById)
router.get('/getUserImg', userController.getUserImgById)

// icon
router.get('/category', iconController.getShowIcon)
router.post('/addIcon', iconController.addIcon)
router.get('/delIcon', iconController.delIcon)
router.get('/allCategory', iconTypeController.getAllIconList)

// bill
router.post('/addBill', billController.addBillRecord)
// 根据userId和billTypeId获取所有账单
router.get('/bills', auth, billController.getBillsByUser)
// delete bill by billId
router.get('/delBill', billController.delBillById)
// update bill by billId
router.post('/updateBill', billController.updateBillById)

// billType
router.get('/bTName', billTypeController.getBillTypeNameById)
router.get('/billType', billTypeController.getBillType)
router.get('/delBTName', billTypeController.delBillTypeById)
router.get('/updateBTName', billTypeController.updateBTNameById)
router.get('/addBTName', billTypeController.addBTNameByName)

// record
router.get('/getOwnRecords', auth, recordController.getOwnRecords)
router.get('/getFriRecords', auth, recordController.getFriRecords)
router.get('/delRecord', recordController.delRecordById)
router.post('/updateRecord', recordController.updateRecordById)
router.post('/addRecord', recordController.addRecord)

// like
router.post('/updateFaOrCol', likeController.updateFavOrColById)
router.post('/addLike', likeController.addLike)
router.get('/getLikeData', likeController.getLikesById)
router.get('/getColAndFarCount', likeController.getColAndFarCountByRecordId)

// comment
router.get('/delComAndRep', commentController.delComAndRepByCommentId)
router.post('/addComment', commentController.addComment)
router.get('/getComAndRep', commentController.getCommentAndReplyByRecordId)
// reply
router.post('/addReply', replyController.addReply)
router.get('/delReply', replyController.delReply)
// welcome
// router.post("/welcome", auth, (req, res) => {
//   res.render('pages/welcome');
//   res.status(200).send("Welcome 👏")
// });

module.exports = router;
