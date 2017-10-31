function router (app) {
  const common = require('./common')
  // 页面
  const page = require('./page')
  // 用户
  const user = require('./user')
  // 分类
  const category = require('./category')

  app.use('/', common)
  app.use('/', page)
  app.use('/user', user)
  app.use('/category', category)
}

module.exports = router
