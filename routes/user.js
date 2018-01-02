const express = require('express')
const router = express.Router()
const user = require('../controller/user')

/* GET users listing. */
router.post('/login', user.login)

// 获取用户数据
router.post('/queryUsers', user.queryUsers)

// 添加用户
router.post('/addUser', user.addUser)

// 随机生成用户
router.post('/addRanUsers', user.addRanUsers)

// 删除用户
router.post('/removeUser', user.removeUser)

module.exports = router
