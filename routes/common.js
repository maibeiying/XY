var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('*', (req, res, next) => {
	res.locals = req.session
  next()
})

router.get('/background', (req, res, next) => {
  res.render('dist/background')
})

router.get('/front', function(req, res, next) {
  res.render('front')
})

module.exports = router
