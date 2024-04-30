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
      req.session.userId = user[0].id

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

router.get('/users:id', function (req, res) {
  res.render('users.njk', { title: 'Welcome' })
})

router.get('/dbtest', async function (req, res) {
  const pool = require('../db')
  const [data] = await pool.promise().query('SELECT * FROM alfred_user')
  res.json({ data })
})

router.get('/newlist', async function (req, res) {

  if (!req.session.username) {
    console.log("inte inloggad, stick")
    return res.redirect('/login')
  }

  const [gameSystems] = await pool.promise().query('SELECT * FROM alfred_game_system')
  res.render('newlist.njk', { title: 'Ny lista', gameSystems })
})

router.post('/newlist', async function (req, res) {

  console.log(req.body)
  // plocka ut värden vi ska ha
  const gameId = parseInt(req.body.game)
  const listname = req.body.listname
  const pointsvalue = parseInt(req.body.pointsvalue)
  const composition = req.body.composition

  console.log(gameId, pointsvalue, composition, listname, req.session.userId)

  try {
    const [result] = await pool.promise().query('INSERT INTO alfred_list (game_system_id, pointsvalue, composition, listname, user_id) VALUES (?, ?, ?, ?, ?);', [gameId, pointsvalue, composition, listname, req.session.userId])
    res.json(result)
  } catch (error) {
    console.log('DET BLEV FEL')
    console.log(error)
    res.json(error)
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