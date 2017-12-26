const express = require('express')
const router = express.Router()
const evaluate = require('../controller/evaluate')

// 添加评价
router.post('/addEvaluate', evaluate.addEvaluate)

// 获取评价列表
router.post('/getEvaluates', evaluate.getEvaluates)

// 删除分类
router.post('/removeEvaluate', evaluate.removeEvaluate)

module.exports = router
