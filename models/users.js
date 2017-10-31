const mongoose = require('mongoose')
const db = require('../mongodb/db')
let userSchema = new mongoose.Schema({
  username: String,
  /* userid: {
    type: String,
    default: new mongoose.Types.ObjectId
  }, */
  userpwd: {
    type: String,
    default: '000000'
  },
  logindate: {
    type: Date,
    default: new Date()
  },
  device: {
    type: String,
    default: 'pc'
  },
  uty: { // 0：超级管理员 1：普通管理员 2：客户
    type: String,
    index: true
  }
})
let userModel = db.model('users', userSchema)
let userCollection = db.collection('users')
// userCollection.createIndex({"username": 1}, {"unique": true})
module.exports = userModel
