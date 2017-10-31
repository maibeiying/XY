const express = require('express')
const router = express.Router()
const category = require('../controller/category')

// 添加分类
router.post('/addCate', category.addCate)

// 获取分类
router.post('/getCates', category.getCates)

// 删除分类
router.post('/removeCate', category.removeCate)

module.exports = router
