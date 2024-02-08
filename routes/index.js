const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome to a site for battlereports on different wargames' })
})

module.exports = router