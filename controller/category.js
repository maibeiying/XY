const cateModel = require('../models/category')

class Category {
  constructor () {}
  // 添加分类
  addCate (req, res) {
    let name = req.body.name
    let count = 0
    cateModel.create({name, count}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '添加成功', code: 1})
    })
  }

  //获取分类
  async getCates (req, res) {
    let result = await cateModel.find()
    res.json({result, code: 1})
  }

  // 删除分类
  async removeCate (req, res) {
    let _id = req.body._id
    cateModel.remove({_id}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '删除成功', code: 1})
    })
  }
}

module.exports = new Category()
