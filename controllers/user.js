// 引用用户模版数据
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const User = require('../models/user');
const Relation = require('../models/relation');

const userController = {
  // 注册信息
  register: async (req, res) => {
    try {
      const { phone, password, existUser } = req.body

      // validate user input
      if (!(phone && password)) {
        return res.status(400).send({ error: "Data not formatted properly" })
      }
      console.log(existUser);
      // check if user already exist
      if (existUser) {
        return res.status(409).send("User already exist. Please Login")
      } else {
        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)

        // create token
        const token = jwt.sign(
          { phone: phone },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        )
        // create register time
        const d = new Date()
        let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        // save user token 
        const user = {
          password: encryptedPassword,
          phone,
          token,
          userName: phone,
          registerTime: date
        }

        // create user in our database
        await User.insert(user)

        // return new user
        res.status(201).send('register success')
      }

    } catch (err) {
      console.log(err);
    }
  },
  existUser: async (req, res) => {
    try {
      let e = await User.findPhone(req.query.phone)
      if (e.length !== 0) {
        res.status(409).send({ message: 'user already exist' })
      } else {
        res.status(600).send({ message: 'not found' })
      }
    } catch (error) {
      console.log(error);
    }
  },
  getFriendsById: async (req, res) => {
    try {
      const friendId = await Relation.getFriendId(req.query.userId)
      let friArr = []
      if (friendId.length) {
        for (const f of friendId) {
          friArr.push(f.friendId)
        }
      }
      const friends = await User.getFriendsByIds(friArr)      
      res.status(200).send(friends)
    } catch (error) {
      console.log(error);
    }
  },

  // login
  login: async (req, res) => {
    try {
      const { phone, password } = req.body
      let p = await User.findPhone(req.body.phone)
      if (p.length) {
        // 明文密码，加密密码
        if (await bcrypt.compare(password, p[0].password) || password === p[0].password) {
          const token = jwt.sign({ phone }, process.env.TOKEN_KEY, { expiresIn: "1d" })
          res.status(200).send({ message: 'success', data: { token, userId: p[0].userId, userName: p[0].userName } })
        } else {
          res.status(200).send({ message: 'errormima' })
        }
      } else {
        res.status(200).send({ message: 'notFound' })
      }
    } catch (error) {
      console.log(error);
    }
  },
  // wxlogin
  wxlogin: (req, res) => {
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxc3483d994aee7ac9&secret=36a9dcf75dde28817556083fa864330d&js_code=${req.query.code}&grant_type=authorization_code`
    axios.get(url).then(async (r) => {
      const { openid, session_key } = r.data
      const result = await User.exitOpenidAndKey({ openid, session_key })
      if (result.length === 0) {
        res.status(200).send({ code: 1, message: 'not fund', data: 'unregistered' })
      } else {
        const { last_login_date } = result[0]
        let nowDate = new Date().getTime()
        let lastDate = last_login_date.getTime()
        console.log(nowDate);
        console.log(lastDate);
        console.log(nowDate - lastDate);
      }
    }).catch(e => {
      res.status(500).send(e)
    })
  },

  // create code
  createCode: (req, res) => {
    try {
      let all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
      let b = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62);
        b += all.charAt(index);
      }
      res.status(200).send({ data: b })
    } catch (error) {
      res.status(500)
    }

  },
  updateUser: async (req, res) => {
    try {
      console.log(req.body);
    } catch (error) {

    }
  },
  // showUser 获取用户数据并返回到页面
  getUserById: async (req, res) => {
    try {
      let userInfo = await User.selectById(req.query.userId)
      res.json({
        code: 1,
        message: "操作成功",
        data: userInfo
      })
    } catch (e) {
      res.json({ code: 0, message: "500", data: e.sqlMessage })
    }
  },

  updateUserById: async (req, res) => {
    try {
      await User.update(req.body.id, req.body.userInfo)
      res.json({ code: 1, message: "操作成功" })
    } catch (error) {
      res.json({ code: 0, message: "500", data: error.sqlMessage })
    }
  },

  getUserImgById: async (req, res) => {
    try {
      const result = await User.getUserImgById(req.query.userId)
      res.status(200).send(result[0])
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = userController;
