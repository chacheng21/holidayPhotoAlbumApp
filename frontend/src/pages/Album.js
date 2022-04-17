/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Button, Typography, Modal,
} from '@mui/material'
import axios from 'axios'
import NewImageForm from '../components/NewImageForm'
import PhotoGallery from '../components/PhotoGallery'

const Album = () => {
  const navigate = useNavigate()
  const { id: _id } = useParams()

  // Albums JSON
  const [images, setImages] = useState([])
  const [albumName, setAlbumName] = useState('')
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const apiCalls = async () => {
      const loggedIn = await axios.post('/albums/loggedIn')
      if (!loggedIn.data.isLoggedIn) {
        navigate('/login')
      } else {
        const getAlbum = await axios.post(`/album/${_id}/getName`)
        const albumJson = await axios.post(`/album/${_id}`)

        setAlbumName(getAlbum.data[0].title)
        setImages(albumJson.data)
      }
    }
    apiCalls()
  }, [open, update])

  const logout = async () => {
    const logoutRes = await axios.post('/account/logout')
    navigate('/login')
  }

  const goHome = async () => {
    navigate('/')
  }

  const homeStyle = {
    position: 'absolute', top: 100, left: 300,
  }

  const logoutStyle = {
    position: 'absolute', top: 100, left: 1675,
  }

  const newImageStyle = {
    position: 'absolute', top: 300, left: 300,
  }

  const labelStyle = {
    position: 'absolute', top: 200, left: 300,
  }

  const albumGalleryStyle = {
    position: 'absolute', top: 400, left: 300,
  }

  return (
    <div>
      <div id="Button Bar">
        <Button variant="outlined" style={newImageStyle} onClick={handleOpen}>Add Photo</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <NewImageForm setOpen={setOpen} albumID={_id} />
        </Modal>
        <Button style={homeStyle} onClick={goHome} color="error" variant="outlined">Home</Button>
        <Button style={logoutStyle} onClick={logout} color="error" variant="outlined">Logout</Button>
      </div>
      <Typography style={labelStyle} variant="h3">
        {' '}
        {albumName}
        {' '}
      </Typography>
      <div id="Photos" style={albumGalleryStyle}>
        <PhotoGallery setUpdate={setUpdate} update={update} images={images} />
      </div>
    </div>
  )
}

export default Album
