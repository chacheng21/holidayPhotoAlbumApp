const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

const AccountRouter = require('./routes/account')
const AlbumsRouter = require('./routes/albums')
const AlbumRouter = require('./routes/album')

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://chacheng:0156@cluster0.f2fnk.mongodb.net/photoAlbumCluster'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist')) // set as static folder

app.use(express.json())
app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],
  maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
}))

app.use('/account', AccountRouter)
app.use('/albums', AlbumsRouter)
app.use('/album', AlbumRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('/', (req, res) => res.send('hello world!'))

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
