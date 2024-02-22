const express = require('express')
const router = express.Router()

const pool = require('../db')
const { render } = require('nunjucks')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome!' })

})

router.get('/dbtest', async function (req, res) {
  try {
    // const [cats] = await pool.promise().query('SELECT * FROM jens_cat')
    const [battlereportWithPlayer] = await pool.promise().query(
      `SELECT * FROM alfred_battlereports JOIN alfred_spelare ON alfred_spelare.id = alfred_spelare.id`
    );
    console.log(battlereportWithPlayer)
    return res.render('battlereport.njk', {
      title: 'Battlereports',
      cats: battlereportWithPlayer
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


router.get('/battlereports', async function (req, res) {

  const [battlereports] = await pool.promise().query("SELECT * FROM alfred_battlereports JOIN alfred_spelare ON alfred_battlereports.spelare_id = alfred_spelare.id")
  console.log(battlereports)
  // const part = battlereports.spelare.find((spelare) => spelare.id === 0)
  // res.render('part.njk', {
  //   username: req.session.username,
  //   title: part.name,
  //   part: part,
  // })

  // res.json({battlereports})
  res.render("test.njk", { battlereports} )
})

router.get('/battlereports/:id', async function (req, res) {

  console.log(req.params.id)

  const [battlereports] = await pool.promise().query(`
    SELECT * FROM alfred_battlereports 
    JOIN alfred_spelare 
      ON alfred_spelare.id = alfred_spelare.id 
    WHERE alfred_battlereports.id = ${req.params.id}`)
  console.log(battlereports)
  // const part = battlereports.spelare.find((spelare) => spelare.id === 0)
  // res.render('part.njk', {
  //   username: req.session.username,
  //   title: part.name,
  //   part: part,
  // })

  // res.json({battlereports})
  res.render("test.njk", { battlereports} )
})

router.get('/newplayer', function (req, res){
  res.render('newplayer.njk', { title: 'Ny spelare' })
})

router.post('/newplayer', async function (req, res) {
  console.log(req.body)
  // plocka ut värden vi ska ha
  const player = req.body.player
  const description = req.body.description
  console.log(breed, description)
  // säkerhet vad har vi för data
  // nästa steg är att skriva in i databasen
  // tableplus för att lära oss SQL fråga
  // INSERT INTO `alfred_spelare` (`namn1`, `armylist1`, `namn2`, `armylist2`) VALUES
  // await.pool.promise().query()
('buffelfisk', 'typ 1 space marine', 'Emrik', '100000 guardsmen');
  res.json(req.body)
})

module.exports = router