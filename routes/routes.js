function router (app) {
  const common = require('./common')
  // 用户
  const user = require('./user')
  // 分类
  const category = require('./category')

  // 上传
  const upload = require('./upload')

  app.use('/', common)
  app.use('/user', user)
  app.use('/category', category)
  app.use('/upload', upload)
}

module.exports = router
