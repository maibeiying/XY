const userModel = require('../models/users')
const randomName = require('chinese-random-name')
// const response = require('../routes/response')

class User {
  // 登录
  async login (req, res) {
    let username = req.body.username
    let userpwd = req.body.userpwd
    let device = req.body.device || 'pc'
    let logindate = new Date()
    let result = await userModel.findOne({userpwd, userpwd})
    if (result) {
      await userModel.update({username, userpwd}, {$set: {device, logindate}})
      req.session.user = result
      res.json({logindate, code: 1})
    } else {
      res.json({msg: '账号或密码错误', code: -1})
    }
  }
  // 获取用户信息
  async queryUsers (req, res) {
    let uty = req.body.uty
    let pageSize = req.body.pageSize * 1
    let page = req.body.page * 1 - 1
    let username = req.session.user && req.session.user.username
    let sql = {username: {$ne: username}}
    if (uty !== 'all') sql.uty = uty
    let count = await userModel.find(sql).count()
    let result = await userModel.find(sql).skip(page * pageSize).limit(pageSize).sort({'logindate': -1})
    res.json({result, code: 1, count})
  }
  // 添加用户
  async addUser (req, res) {
    let username = req.body.username
    let userpwd = req.body.userpwd || '123456'
    let uty = req.body.uty
    let logindate = new Date()
    let result = await userModel.findOne({username})
    if (result) return res.json({msg: '已存在该用户', code: -1})
    userModel.create({username, userpwd, logindate, uty}, (err, result) => {
      if (err) return res.json({msg: '添加失败', code: -1})
      req.session.user = {
        username,
        userpwd,
        uty,
        logindate
      }
      res.json({msg: '添加成功', code: 1})
    })
  }
  // 随机生成用户
  async addRanUsers (req, res) {
    let count = req.body.userNumber * 1
    let uty = req.body.uty
    let userpwd = '123456'
    let logindate = new Date()
    let list = []
    try {
      for (let i = 0; i < count; i++) {
        let random = Math.random()
        let username = null
        username = `xy13${Math.ceil(Math.random() * 899999999 + 100000000)}`
        /* if (random > .5) {
          username = `xy13${Math.ceil(Math.random() * 899999999 + 100000000)}`
        } else {
          username = randomName.names.get3()
        } */
        list.push({
          username,
          uty,
          userpwd,
          logindate
        })
      }
      await userModel.create(list)
    } catch (e) {
      res.json({code: -1, msg: '生成用户数据失败'})
    }
    res.json({result: list, msg: `共生成${list.length}条用户数据`, code: 1})
  }
  // 删除用户
  removeUser (req, res) {
    let _id = req.body._id
    userModel.remove({_id}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '删除成功', code: 1})
    })
  }
}

module.exports = new User()
