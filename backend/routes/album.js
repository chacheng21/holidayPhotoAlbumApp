/* eslint-disable prefer-destructuring */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const { Photo } = require('../models/photo')
const { Album } = require('../models/album')

const router = express.Router()

router.post('/:id', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    const _id = req.params.id
    const photos = await Photo.find({ album: _id }).sort({ date: -1 })
    res.status(200)
    res.json(photos)
  } catch (e) {
    next(e)
  }
})

router.post('/:id/getName', isAuthenticated, async (req, res, next) => {
  try {
    isAuthenticated(req, res, err => {
      if (err) {
        next(err)
      }
    })

    const _id = req.params.id
    const album = await Album.find({ _id })
    res.status(200)
    res.json(album)
  } catch (e) {
    next(e)
  }
})

router.post('/:id/add', isAuthenticated, async (req, res, next) => {
  const { body, params } = req
  const { id } = params
  const {
    image, title, description, place, coordinate,
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
        image, title, album: id, place, date, coordinate,
      })
    } else {
      await Photo.create({
        image, title, description, album: id, place, date, coordinate,
      })
    }

    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

router.post('/:id/delete', isAuthenticated, async (req, res, next) => {
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

router.post('/:id/edit', async (req, res, next) => {
  const { body, params } = req
  const { id } = params
  const {
    _id, image, title, description, place, coordinate,
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
        image, title, album: id, place, coordinate, date,
      })
    } else {
      await Photo.findOneAndUpdate({ _id }, {
        image, title, description, album: id, place, coordinate, date,
      })
    }

    res.status(200)
    res.send('Success')
  } catch (e) {
    next(e)
  }
})

module.exports = router
