const userModel = require('../models/users')
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
      res.json({logindate, code: 1})
    } else {
      res.json({msg: '账号或密码错误', code: -1})
    }
  }
  // 获取用户信息
  async getUsers (req, res) {
    let uty = req.query.uty
    let pageSize = req.query.pageSize * 1
    let page = req.query.page * 1 - 1
    let query = userModel.find({uty})
    let count = await query.count()
    let result = await userModel.find({uty}).skip(page * pageSize).limit(pageSize).sort({'logindate': -1})
    res.json({result, code: 1, count})
  }
  // 添加用户
  async addUser (req, res) {
    let username = req.body.username
    let userpwd = req.body.userpwd || '123456'
    let uty = req.body.uty || 1
    let logindate = new Date().toLocaleString()
    let result = await userModel.findOne({username})
    if (result) return res.json({msg: '已存在该用户', code: -1})
    userModel.create({username, userpwd, logindate, uty}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '添加成功', code: 1})
    })
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
