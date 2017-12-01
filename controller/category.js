const cateModel = require('../models/category')
const response = require('../routes/response')

class Category {
  constructor () {}
  // 添加分类
  addCate (req, res) {
    let catename = req.body.catename
    let count = 0
    cateModel.create({catename, count}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '添加成功', code: 1}, res)
    })
  }

  //获取分类
  async getCates (req, res) {
    let result = await cateModel.find()
    response({result, code: 1}, res)
  }

  // 删除分类
  async removeCate (req, res) {
    let _id = req.body._id
    cateModel.remove({_id}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '删除成功', code: 1}, res)
    })
  }
}

module.exports = new Category()
