var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('*', (req, res, next) => {
	res.locals.user = {title: '趣乐'}
  // console.log(req)
  next()
})

module.exports = router
