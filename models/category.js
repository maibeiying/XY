const mongoose = require('mongoose')
const db = require('../mongodb/db')
let cateSchema = new mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  count: {
    type: Number
  }
})
let cateModel = db.model('category', cateSchema)
// cateSchema.path('catename').index({ unique: true });
module.exports = cateModel
