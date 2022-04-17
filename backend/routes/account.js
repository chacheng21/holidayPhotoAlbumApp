const express = require('express')
const bcrypt = require('bcrypt')
const isAuthenticated = require('../middlewares/isAuthenticated')

const { User } = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    await User.create({ username, password: hashedPassword })
    req.session.username = username
    res.status(200)
    res.send('user creation was successful')
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  try {
    const user = await User.findOne({ username })

    if (user === null) {
      res.status(404)
      res.send('User not found')
      return
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.status(403)
      res.send('Password Incorrect')
    } else {
      req.session.username = username
      res.status(200)
      res.send('Login Successful')
    }
  } catch (e) {
    next(e)
  }
})

router.post('/logout', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      } else {
        req.session = null
        res.status(200)
        res.send('Logout Successful')
      }
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
