const mongoose = require('mongoose')
const db = require('../mongodb/db')
let goodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  cateId: {
    type: String,
    required: true
  },
  cateName: {
    type: String,
    required: true
  },
  mainImg: {
    type: String,
    required: true
  },
  prevImg: {
    type: String,
    required: true
  },
  isShow: {
    type: Boolean,
    required: true
  }
}, {collection: 'goods'})
let goodsModel = db.model('goods', goodsSchema)
// userSchema.index({username: 1})
module.exports = goodsModel
