const express = require('express')
const { query, matchedData, validationResult, body } = require('express-validator')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const session = require('express-session')


router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome!', loggedin: req.session.loggedin || false })
})

router.get('/newuser', function (req, res) {
  res.render('newuser.njk', { title: 'Ny användare', loggedin: req.session.loggedin || false })
})

router.post('/newuser',
  body("username").notEmpty().trim().escape(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  async function (req, res) {

    const result = validationResult(req);

    console.log(result)
    if (result.isEmpty()) {
      const username = req.body.username
      const email = req.body.email
      const password = req.body.password

      console.log(username, email, password)

      bcrypt.hash(password, 10, async function (err, hash) {
        try {
          const [result] = await pool.promise().query('INSERT INTO alfred_user (username, email, password) VALUES (?, ?, ?)', [username, email, hash])
          return res.redirect('/login')
        } catch (error) {
          console.log(error)

          return res.send({ errors: result.array() });
        }
      })
    }
  })

router.get('/login', function (req, res) {
  res.render('login.njk', { loggedin: req.session.loggedin || false })
})

router.post('/login', async function (req, res) {
  const userFromForm = req.body.username
  const passwordFromForm = req.body.password

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
  res.render('secret.njk', { username: req.session.username, loggedin: req.session.loggedin || false })
})

router.get('/hash', async function (req, res) {

  bcrypt.hash("roblox", 10, function (err, hash) {

    console.log(hash);
    return res.json(hash);
  });
})

router.get('/users', async function (req, res) {

  const [users] = await pool.promise().query('SELECT id, username FROM alfred_user')

  console.log(users)

  res.render('users.njk', { title: 'Welcome', users, loggedin: req.session.loggedin || false })
})

router.get('/users/:id', async function (req, res) {

  try {
    const [userWithLists] = await pool.promise().query(
      `SELECT alfred_user.username, alfred_list.game_system_id as game, alfred_list.pointsvalue as ptsValue, alfred_list.composition as composition, alfred_list.user_id as userid, alfred_list.listname as listname, alfred_list.id as listId
      FROM alfred_list
      JOIN alfred_user
      ON alfred_user.id = alfred_list.user_id
      WHERE alfred_user.id = ?`, [req.params.id]
    );

    console.log(userWithLists)

    res.render('profile.njk', { title: 'Welcome', userWithLists, loggedin: req.session.loggedin || false })

  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
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
  res.render('newlist.njk', { title: 'Ny lista', gameSystems, loggedin: req.session.loggedin || false })
})

router.post('/newlist', async function (req, res) {

  console.log(req.body)
  // plocka ut värden vi ska ha
  const gameId = parseInt(req.body.game)
  const listname = req.body.listname
  const pointsvalue = parseInt(req.body.pointsvalue)
  const composition = req.body.composition
  const user_id = req.session.userId

  console.log(gameId, pointsvalue, composition, listname, user_id)

  try {
    const [result] = await pool.promise().query('INSERT INTO alfred_list (game_system_id, pointsvalue, composition, listname, user_id) VALUES (?, ?, ?, ?, ?);', [gameId, pointsvalue, composition, listname, user_id])
    return res.redirect('/')
  } catch (error) {
    console.log('DET BLEV FEL')
    console.log(error)
    return res.json(error)
  }
})

router.get('/logout', function (req, res) {

  console.log(req.session.username)

  if (!req.session.username) {
    return res.redirect('/')
  }
  req.session.loggedin = false
  console.log("Logged out")
  res.render('logout.njk', { title: 'Welcome', loggedin: req.session.loggedin || false })
})

router.get('/lists', async function (req, res) {

  const [lists] = await pool.promise().query('SELECT id, listname FROM alfred_list')

  console.log(lists)

  res.render('lists.njk', { title: 'Welcome', lists, loggedin: req.session.loggedin || false })
})

router.get('/lists/:id', async function (req, res) {

  try {
    const [list] = await pool.promise().query(
      `SELECT alfred_list.*, alfred_user.username FROM alfred_list JOIN alfred_user 
      ON alfred_user.id = alfred_list.user_id
      WHERE alfred_list.id = ?`,
       [req.params.id]
    );

    console.log(list)

    res.render('list.njk', { title: 'Welcome', list: list[0], loggedin: req.session.loggedin || false })

  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

module.exports = router