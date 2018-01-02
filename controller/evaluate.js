const evaluateModel = require('../models/evaluate')

class Evaluate {
  constructor () {}
  // 添加评价
  addEvaluate (req, res) {
    let desc = req.body.desc
    let goodsId = req.body.goodsId
    let goodsName = req.body.goodsName
    let grade = req.body.grade
    let userId = req.body.userId
    let time = new Date()
    evaluateModel.create({goodsId, userId, desc, grade, time}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '添加成功', code: 1})
    })
  }

  // 获取评价
  async queryEvaluates (req, res) {
    let grade = req.body.grade
    let time = req.body.time
    let goodsId = req.body.goodsId
    let sql = {goodsId}
    if (grade !== 'all') sql.grade = grade * 1
    if (time === 'day') {
      sql.time = {
        $gte: new Date()
      }
    }
    let count = await evaluateModel.find(sql).count()
    let result = await evaluateModel.find(sql)
    res.json({result, count, code: 1})
  }

  // 删除评价
  async removeEvaluate (req, res) {
    let _id = req.body._id
    evaluateModel.remove({_id}, (err, result) => {
      if (err) return res.json({msg: err.message, code: -1})
      res.json({msg: '删除成功', code: 1})
    })
  }
}

module.exports = new Evaluate()
