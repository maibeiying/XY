const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://maibeiying:27017/qule')
mongoose.Promise = global.Promise

// 链接错误
db.on('error', function (error) {
  console.log('mongodb链接异常')
  console.log(error)
})

// 链接成功
db.on('connected', function () {
  console.log('连接成功')
})

module.exports = db
