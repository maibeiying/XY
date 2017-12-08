const goodsModel = require('../models/goods')

class Goods {
  constructor () {}
  // 添加商品
  addGoods (req, res) {
    let name = req.body.name
    let price = req.body.price
    let cateId = req.body.cateId
    let cateName = req.body.cateName
    let desc = req.body.desc
    let mainImg = req.body.mainImg
    let prevImg = req.body.prevImg
    let isShow = req.body.isShow
    goodsModel.create({name, price, cateId, cateName, desc, mainImg, prevImg, isShow}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '添加成功', code: 1})
    })
  }

  //获取商品
  async queryGoods (req, res) {
    let cateId = req.body.cateId || ''
    let isShow = req.body.isShow || ''
    let name = req.body.name || ''
    let minPirce = req.body.minPrice * 1 || 0
    let maxPirce = req.body.maxPirce * 1 || 99999
    let pageSize = req.body.pageSize || 10
    let page = req.body.page
    /* let result = await goodsModel.find({
       cateId,
      isShow,
      name: {
        $regex: name,
        $options: 'i'
      },
      price: {
        $gte: minPirce, 
        $lt: maxPirce
      } 
    }).limit(pageSize).skip(page * pageSize) */
    let count = await goodsModel.find({}).count()
    let result = await goodsModel.find({}).sort({_id: -1})
    res.json({result, count, code: 1})
  }

  // 删除分类
  async removeGoods (req, res) {
    let _id = req.body._id
    goodsModel.remove({_id}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '删除成功', code: 1})
    })
  }
}

module.exports = new Goods()
