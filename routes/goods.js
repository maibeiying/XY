const express = require('express')
const router = express.Router()
const goods = require('../controller/goods')

// 添加商品
router.post('/addGoods', goods.addGoods)

// 查询商品
router.post('/queryGoods', goods.queryGoods)

// 更新商品
router.post('/updateGoods', goods.updateGoods)

// 删除商品
router.post('/removeGoods', goods.removeGoods)

module.exports = router
