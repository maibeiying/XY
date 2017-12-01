function router (app) {
  const common = require('./common')
  // 用户
  const user = require('./user')
  // 分类
  const category = require('./category')

  app.use('/', common)
  app.use('/user', user)
  app.use('/category', category)
}

module.exports = router
