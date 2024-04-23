const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const { render } = require('nunjucks');
const session = require('express-session');

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome!', loggedin: req.session.loggedin || false })

})

router.get('/newuser', function (req, res) {
  res.render('newuser.njk', { title: 'Ny användare' })
})

router.post('/newuser', async function (req, res) {
  console.log(req.body)
  // plocka ut värden vi ska ha
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  console.log(username, email, password)

  bcrypt.hash(password, 10, async function (err, hash) {

    try {
      const [result] = await pool.promise().query('INSERT INTO alfred_user (username, password) VALUES (?, ?)', [username, hash])
      return res.redirect('/')
    } catch (error) {
      console.log(error)
    }
    res.json(req.body)
  })
})

router.get('/list/:id', async function (req, res) {
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

router.get('/login', function (req, res) {
  res.render('login.njk')
})

router.post('/login', async function (req, res) {
  const userFromForm = req.body.username
  const passwordFromForm = req.body.password
  const emailFromForm = req.body.email

  const [user] = await pool.promise().query(
    'SELECT * FROM alfred_user WHERE username = ?', [userFromForm]
  )
  console.log(user)

  bcrypt.compare(passwordFromForm, user[0].password, function (err, result) {
    if (result == true) {
      console.log(result, 'inloggad')
      req.session.loggedin = true
      req.session.username = user[0].username

      console.log(req.session.loggedin)
      res.redirect('/')
    } else {
      console.log(result, 'inte inloggad >:(')
      res.redirect('/')
    }
  });
})

router.get('/secret', function (req, res) {

  console.log(req.session.username)

  if (!req.session.username) {
    console.log("inte inloggad, stick")
    return res.redirect('/login')
  }
  res.render('secret.njk', { username: req.session.username })
})

router.get('/hash', async function (req, res) {

  bcrypt.hash("roblox", 10, function (err, hash) {

    console.log(hash);
    return res.json(hash);
  });
})

router.get('/users', function (req, res) {
  res.render('users.njk', { title: 'Welcome' })
})

router.get('/dbtest', async function (req, res) {
  const pool = require('../db')
  const [data] = await pool.promise().query('SELECT * FROM alfred_user')
  res.json({ data })
})

router.get('/newlist', function (req, res) {
  res.render('newlist.njk', { title: 'Ny lista' })
})

router.post('/newlist', async function (req, res) {
  console.log(req.body)
  // plocka ut värden vi ska ha
  const game = req.body.game
  const listname = req.body.listname
  const pointsvalue = req.body.pointsvalue
  const composition = req.body.composition

  console.log(listname, game, composition)
  try {
    const [result] = await pool.promise().query('INSERT INTO alfred_list (game, pointsvalue, composition, listname) VALUES (?, ?, ?, ?)', [username, listname, pointsvalue, composition])
    return res.redirect('/')
  } catch (error) {
    console.log(error)
  }


})

router.get('/logout', function (req, res) {

  console.log(req.session.username)

  if (!req.session.username) {
    return res.redirect('/')
  }
  req.session.loggedin = false
  console.log("Logged out")
  res.render('logout.njk')
})

module.exports = router