/* eslint-disable prefer-destructuring */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const { Album } = require('../models/album')

const router = express.Router()

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    const username = req.session.username
    const albums = await Album.find({ user: username }).sort({ date: -1 })
    res.status(200)
    res.json(albums)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { title, date, place } = body
  const user = req.session.username

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      await Album.create({ title, user, place })
    } else {
      await Album.create({
        title, user, place, date,
      })
    }
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/delete', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    await Album.findOneAndDelete({ _id })
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/edit', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const {
    _id, title, date, place,
  } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      await Album.findByIdAndUpdate({ _id }, { title, place })
    } else {
      await Album.findByIdAndUpdate({ _id }, { title, date, place })
    }
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/loggedIn', (req, res) => {
  const { session } = req
  const { username } = session
  const isLoggedIn = (username !== undefined)
  const json = { isLoggedIn, username }
  res.json(json)
})

module.exports = router
