const goodsModel = require('../models/goods')
const cateModel = require('../models/category')

class Goods {
  constructor () {}
  // 添加商品
  async addGoods (req, res) {
    let name = req.body.name
    let price = req.body.price
    let cateId = req.body.cateId
    let cateName = req.body.cateName
    let desc = req.body.desc
    let mainImg = req.body.mainImg
    let prevImg = req.body.prevImg
    let isShow = req.body.isShow
    goodsModel.create({name, price, cateId, cateName, desc, mainImg, prevImg, isShow}, async (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      await cateModel.update({_id: cateId}, {$inc: {count: 1}})
      res.json({msg: '添加成功', code: 1})
    })
  }

  // 获取商品
  async queryGoods (req, res) {
    let id = req.body.id // 商品id
    let cateId = req.body.cateId || ''
    let isShow = req.body.isShow
    let name = req.body.name || ''
    let price = req.body.price
    let pageSize = req.body.pageSize || 10
    let page = req.body.page * 1 - 1
    let sql = {}
    if (id) sql._id = id
    if (name) {
      sql.name = {
        $regex: name,
        $options: 'g'
      }
    }
    if (price && price !== ' ') {
      price = price.split(',')
      sql.price = {
        $gte: price[0], 
        $lt: price[1]
      }
    }
    if (cateId !== ' ' && cateId) sql.cateId = cateId
    if (isShow && isShow !== ' ') sql.isShow = isShow
    let count = await goodsModel.find(sql).count()
    let result = await goodsModel.find(sql).sort({_id: -1}).limit(pageSize).skip(page * pageSize)
    res.json({result, count, code: 1})
  }

  // 更新商品
  updateGoods (req, res) {
    let _id = req.body.id
    let name = req.body.name
    let price = req.body.price
    let cateId = req.body.cateId
    let cateName = req.body.cateName
    let desc = req.body.desc
    let mainImg = req.body.mainImg
    let prevImg = req.body.prevImg
    let isShow = req.body.isShow
    goodsModel.update({_id}, {$set: {name, price, cateId, cateName, desc, mainImg, prevImg, isShow}}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '修改成功', code: 1})
    })
  }

  // 删除商品
  async removeGoods (req, res) {
    let _id = req.body._id
    goodsModel.remove({_id}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '删除成功', code: 1})
    })
  }
}

module.exports = new Goods()
