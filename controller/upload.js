const multiparty = require('multiparty')
const util = require('util')
const path = require('path')
const fs = require('fs')
class Upload {
  upload (req, res) {
    let uploadPath = path.resolve(__dirname, '../static/upload')
    let date = new Date()
    let pathName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let pathNameArr = path.resolve(uploadPath, pathName).split('\\')
    // let fileName = this.uid(8)
    let temp = ''
    pathNameArr.forEach(item => {
      temp += `${item}/`
      if (!fs.existsSync(temp)) fs.mkdirSync(temp)
    })
    let form = new multiparty.Form()
    form.uploadDir = temp
    form.parse(req, (err, fields, files) => {
      let fileName = files.file[0].path.split('\\').pop()
      res.json({
        name: `${fileName}`,
        url: `/upload/${pathName}/${fileName}`
      })
    })
  }

  uid (size) {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let chart = ''
    for (let i = 0; i < size; i++) {
      let ran = Math.floor(Math.random() * str.length)
      chart += str.charAt(ran)
    }
    return chart
  }
}
module.exports = new Upload()
