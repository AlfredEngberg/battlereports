const express = require('express')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome!' })

})


router.get('/battlereports', async function (req, res) {

  const [result] = await pool.promise().query("SELECT * FROM alfred_battlereports JOIN alfred_spelare ON alfred_spelare.id = alfred_spelare.id")
  console.log(result)
  // const part = battlereports.spelare.find((spelare) => spelare.id === 0)
  // res.render('part.njk', {
  //   username: req.session.username,
  //   title: part.name,
  //   part: part,
  // })
})

module.exports = router