function response (result, res) {
  let obj = {}
  if (!result) {
    obj = {
      msg: '服务器异常',
      status: 500
    }
  } else {
    obj = {
      result,
      status: 200
    }
  }
  res.json(obj)
}
module.exports = response
