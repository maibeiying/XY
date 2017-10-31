const userModel = require('../models/users')
const response = require('../routes/response')

class User {
  // 登录
  async login (req, res) {
    let username = req.body.username
    let userpwd = req.body.userpwd
    let device = req.body.device || 'pc'
    let logindate = new Date()
    let result = await userModel.findOne({username,userpwd})
    if (result) {
      await userModel.update({username, userpwd}, {$set: {device, logindate}})
      response({result, code: 1}, res)
    } else {
      response({msg: '账号或密码错误', code: -1}, res)
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
    response({result, code: 1, count}, res)
  }
  // 添加用户
  addUser (req, res) {
    let username = req.body.username
    let uty = req.body.uty || 1
    let logindate = new Date()
    userModel.create({username, logindate, uty}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '添加成功', code: 1}, res)
    })
  }
  // 删除用户
  removeUser (req, res) {
    let _id = req.body._id
    userModel.remove({_id}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '删除成功', code: 1}, res)
    })
  }
}

module.exports = new User()
