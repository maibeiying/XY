const mongoose = require('mongoose')
const db = require('../mongodb/db')
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
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
    type: String
  },
  device: {
    type: String,
    default: 'pc'
  },
  uty: { // 0：超级管理员 1：普通管理员 2：客户
    type: String,
    index: true
  }
}, {collection: 'users'})
let userModel = db.model('users', userSchema)
// userSchema.index({username: 1})
module.exports = userModel
