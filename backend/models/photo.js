const mongoose = require('mongoose')
const { AlbumSchema } = require('./album')

const { Schema, model } = mongoose

const PhotoSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  description: { type: String },
  date: { type: Date },
  location: { type: [Number], required: true },
})

const Photo = model('Photo', PhotoSchema)

module.exports = { PhotoSchema, Photo }

/*
Photo URL: String
Title: String
Description: String
Date: Date
Location: [Number]
*/
