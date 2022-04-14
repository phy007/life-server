// 上传下载
const fs = require('fs')

const file = {
  del: function (req, res) {
    const { filename } = req.query
    fs.unlink(`./static/uploads/${filename}`, function (err) {
      if (err) {
        throw err;
      }
    })
    res.sendStatus(200)
  },

  // 一种：将上传的图片的base64存储在数据库中，前台获取该数据，前台进行转换呈现
  // 2：上传的图片存储在服务器资源文件里，前台使用该图片，请求接口返回图片资源，前台在做处理

  upload: (req, res) => {
    console.log(req.files[0]);
    let { size, mimetype, path } = req.files[0]
    let types = ['jpg', 'jpeg', 'png', 'gif']
    let tmpType = mimetype.split('/')[1]
    let newName = `${new Date().getTime() + Math.ceil(Math.random() * 100000)}.${tmpType}`
    if (size > 5000000) {
      res.json({ code: -1, message: '尺寸过大' })
    } else if (types.indexOf(tmpType) == -1) {
      res.json({ code: -2, message: '类型错误' })
    } else {
      // 重命名文件，将文件保存在static目录下
      fs.rename(path, `./static/uploads/${newName}`, function (err) {
        if (err) {
          throw err;
        }
      })
      res.json({ code: 0, message: newName })
    }
  },

  down: function (req, res) {
    // 接收文件名称
    const { imgUrl } = req.query
    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    fs.readFile(`./static/upload/${imgUrl}`, "binary", function (err) {

    })
  },


}

module.exports = file
