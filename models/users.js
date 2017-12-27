const mongoose = require('mongoose')
const db = require('../mongodb/db')
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  /* userid: {
    type: String,
    default: new mongoose.Types.ObjectId
  }, */
  userpwd: {
    type: String
  },
  logindate: {
    type: Date
  },
  device: {
    type: String,
    default: 'pc'
  },
  uty: { // {0, 1, 2, 3} => {超级管理员, 普通管理员, 真实客户, 随机生成的客户}
    type: String,
    index: true
  }
}, {collection: 'users'})
let userModel = db.model('users', userSchema)
// userSchema.index({username: 1})
module.exports = userModel
