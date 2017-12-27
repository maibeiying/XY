const mongoose = require('mongoose')
const db = require('../mongodb/db')
let evaluate = new mongoose.Schema({
  // 商品id
  goodsId: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  // 商品名称
  goodsName: {
    type: String
  },
  // 评价内容
  desc: {
    type: String
  },
  // 评分
  grade: {
    type: Number
  },
  // 评价人id
  userId: {
    type: String
  },
  // 评价时间
  time: {
    type: Date
  }
})
let cateModel = db.model('evaluate', evaluate)
// cateSchema.path('catename').index({ unique: true });
module.exports = evaluate
