const cateModel = require('../models/goods')

class Goods {
  constructor () {}
  // 添加商品
  addGoods (req, res) {
    let name = req.body.name
    let price = req.body.price
    let cateId = req.body.cateId
    let cateName = req.body.cateName
    let count = 0
    cateModel.create({name, count}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '添加成功', code: 1}, res)
    })
  }

  //获取分类
  async getGoods (req, res) {
    let result = await cateModel.find()
    response({result, code: 1}, res)
  }

  // 删除分类
  async removeGoods (req, res) {
    let _id = req.body._id
    cateModel.remove({_id}, (err, result) => {
      if (err) return response({msg: err.message, code: -1}, res)
      response({msg: '删除成功', code: 1}, res)
    })
  }
}

module.exports = new Goods()
