const express = require('express')
const router = express.Router()
const upload = require('../controller/upload')

/* GET users listing. */
router.post('/upload', upload.upload.bind(upload))

module.exports = router
