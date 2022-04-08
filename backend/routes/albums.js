/* eslint-disable prefer-destructuring */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const { Album } = require('../models/album')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    const username = req.session.username
    const albums = await Album.find({ user: username })
    res.status(200)
    res.json(albums)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { title, date } = body
  const user = req.session.username

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      await Album.create({ title, user, date })
    } else {
      await Album.create({ title, user })
    }
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.delete('/delete', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    await Album.findOne({ _id })
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/edit', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id, title, date } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      await Album.findByIdAndUpdate({ _id }, { title })
    } else {
      await Album.findByIdAndUpdate({ _id }, { title, date })
    }
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.get('/loggedIn', (req, res) => {
  const { session } = req
  const { username } = session
  const isLoggedIn = (username !== undefined)
  const json = { isLoggedIn, username }
  res.json(json)
})

module.exports = router
