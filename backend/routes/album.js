/* eslint-disable prefer-destructuring */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const { Photo } = require('../models/photo')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    const _id = req.body._id
    const photos = await Photo.find({ album: _id })
    res.status(200)
    res.json(photos)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const {
    image, title, description, album, location,
  } = body
  let { date } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      date = Date.now()
    }

    if (description === null || description.length === 0) {
      await Photo.create({
        image, title, album, location, date,
      })
    } else {
      await Photo.create({
        image, title, description, album, location, date,
      })
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

    await Photo.deleteOne({ _id })
    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/edit', async (req, res, next) => {
  const { body } = req
  const {
    _id, image, title, description, album, location,
  } = body
  let { date } = body

  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    if (date == null || date.length === 0) {
      date = Date.now()
    }

    if (description === null || description.length === 0) {
      await Photo.findOneAndUpdate({ _id }, {
        image, title, album, location, date,
      })
    } else {
      await Photo.findOneAndUpdate({ _id }, {
        image, title, description, album, location, date,
      })
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
