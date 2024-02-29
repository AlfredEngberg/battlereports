const express = require('express')
const router = express.Router()

const pool = require('../db')
const { render } = require('nunjucks')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome!' })

})

router.get('/dbtest', async function (req, res) {
  try {
    const [battlereportWithPlayer] = await pool.promise().query(
      `SELECT * FROM alfred_battlereports JOIN alfred_spelare ON alfred_spelare.id = alfred_spelare.id`
    );
    console.log(battlereportWithPlayer)
    return res.render('battlereport.njk', {
      title: 'Battlereports',
      battlereportWithPlayer: battlereportWithPlayer
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
  res.render("test.njk", { battlereports })
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
  res.render("test.njk", { battlereports })
})

router.get('/newplayer', function (req, res) {
  res.render('newplayer.njk', { title: 'Ny spelare' })
})

router.post('/newplayer', async function (req, res) {
  console.log(req.body)
  // plocka ut värden vi ska ha
  const namn = req.body.namn
  const armylist = req.body.armylist
  console.log(namn, armylist)
  const [result] = await pool.promise().query('INSERT INTO alfred_spelare (namn, armylist) VALUES (?, ?)', [namn, armylist])
  // säkerhet vad har vi för data
  // nästa steg är att skriva in i databasen
  // tableplus för att lära oss SQL fråga
  // INSERT INTO `alfred_spelare` (`namn`, `armylist`, `namn2`, `armylist2`) VALUES
  // await.pool.promise().query()
  // ('buffelfisk', 'typ 1 space marine', 'Emrik', '100000 guardsmen');

  // const title = req.body.title
  // const spel = req.body.spel
  // const spelare_id = req.body.spelare_id
  // const image = req.body.image
  // const text = req.body.text
  // const vinnare = req.body.vinnare
  // console.log(title, spel, spelare_id, image, text, vinnare)
  // const [result] = await pool.promise().query('INSERT INTO alfred_battlereports (title, spel, spelare_id, image, text, vinnare) VALUES (?, ?, ?, ?, ?, ?)', [title, spel, spelare_id, image, text, vinnare])
  res.json(req.body)
})

router.get('/spelare', async function (req, res) {
  const [spelare] = await pool.promise().query("SELECT * FROM alfred_spelare")
  console.log(spelare)
  // const part = battlereports.spelare.find((spelare) => spelare.id === 0)
  // res.render('part.njk', {
  //   username: req.session.username,
  //   title: part.name,
  //   part: part,
  // })

  // res.json({battlereports})
  res.render("spelare.njk", { spelare })
})

router.get('/profile/:id', async function (req, res) {
console.log(req.params.id)

 const player_id = req.params.id
  try {
    const [playerWithList] = await pool.promise().query(
      `SELECT alfred_spelare.*, alfred_lists.namn as listnamn, alfred_lists.list as player_list
      FROM alfred_spelare
      JOIN alfred_lists
      ON alfred_spelare.id = alfred_lists.spelare_id
      WHERE alfred_spelare.id = ?`, [player_id]
    );

    console.log(playerWithList)
    return res.render('profile.njk', {
      title: 'Spelaren:',
      player: playerWithList[0]
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  } 
})
module.exports = router