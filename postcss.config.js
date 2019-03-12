const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const varObj = {
  '--main-color': '#409EFF',
  '--light-color': '#eaf6fc',
  '--c-color': '#ededed',
  '--border-color': '#efefef'
}
module.exports = {
  plugins: [
  	cssnext({
      'browserslist': [
        "last 3 version",
        "ie 9"
      ],
      'warnForDuplicates': false,
      features: {
        customProperties: {
          variables: varObj
        }
      }
    }),
    cssnano({
      zindex: false
    })
  ]
}
