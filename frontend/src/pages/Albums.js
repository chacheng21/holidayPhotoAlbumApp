/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Typography, Modal,
} from '@mui/material'
import axios from 'axios'
import NewAlbumForm from '../components/NewAlbumForm'
import AlbumGallery from '../components/AlbumGallery'

const Albums = () => {
  const navigate = useNavigate()

  // Albums JSON
  const [albums, setAlbums] = useState([])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const apiCalls = async () => {
      const loggedIn = await axios.post('/albums/loggedIn')
      if (!loggedIn.data.isLoggedIn) {
        navigate('/login')
      } else {
        const albumsJson = await axios.post('/albums')

        const threes = []
        let trio = []
        albumsJson.data.forEach(element => {
          trio.push(element)

          if (trio.length === 3) {
            threes.push([...trio])
            trio = []
          }
        })

        threes.push([...trio])

        setAlbums(threes)
      }
    }
    apiCalls()
  })

  const logout = async () => {
    const logoutRes = await axios.post('/account/logout')
    navigate('/login')
  }

  const newAlbumStyle = {
    position: 'absolute', top: 100, left: 300,
  }

  const logoutStyle = {
    position: 'absolute', top: 100, left: 1450,
  }

  const labelStyle = {
    position: 'absolute', top: 200, left: 300,
  }

  const albumGalleryStyle = {
    position: 'absolute', top: 300, left: 300,
  }

  return (
    <div>
      <div id="Button Bar">
        <Button variant="outlined" style={newAlbumStyle} onClick={handleOpen}>Create New Album</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <NewAlbumForm setOpen={setOpen} />
        </Modal>
        <Button style={logoutStyle} onClick={logout} color="error" variant="outlined">Logout</Button>
      </div>
      <br />
      <Typography style={labelStyle} variant="h3"> Your Albums </Typography>
      <div id="Albums" style={albumGalleryStyle}>
        <AlbumGallery albums={albums} />
      </div>
    </div>
  )
}

export default Albums
