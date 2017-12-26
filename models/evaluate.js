const mongoose = require('mongoose')
const db = require('../mongodb/db')
let evaluate = new mongoose.Schema({
  goodsId: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  evaluate: {
    type: String
  },
  time: {
    type: Date
  }
})
let cateModel = db.model('evaluate', evaluate)
// cateSchema.path('catename').index({ unique: true });
module.exports = evaluate
