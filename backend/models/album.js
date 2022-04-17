const mongoose = require('mongoose')

const { Schema, model } = mongoose

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  user: { type: String, required: true },
  place: { type: String },
  date: { type: Date },
})

const Album = model('Album', AlbumSchema)

module.exports = { AlbumSchema, Album }

/*
Title: String
Date: Date
Photos: [photo]
*/
