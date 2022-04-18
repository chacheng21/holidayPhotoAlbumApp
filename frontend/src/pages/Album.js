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
import Maps from '../components/Maps'

const Album = () => {
  const navigate = useNavigate()
  const { id: _id } = useParams()

  // Albums JSON
  const [images, setImages] = useState([])
  const [albumName, setAlbumName] = useState('')
  const [open, setOpen] = useState(false)
  const [openMap, setOpenMap] = useState(false)
  const [update, setUpdate] = useState(false)
  const [coordinates, setCoordinates] = useState([])
  const [titleArr, setTitleArr] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenMap = () => setOpenMap(true)
  const handleCloseMap = () => setOpenMap(false)

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

        const coordArr = []
        const titleArray = []
        albumJson.data.forEach(item => {
          coordArr.push(item.coordinate)
          titleArray.push(item.title)
        })

        setTitleArr(titleArray)
        setCoordinates(coordArr)
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
    position: 'absolute', top: 100, left: 200,
  }

  const logoutStyle = {
    position: 'absolute', top: 100, left: 1575,
  }

  const newImageStyle = {
    position: 'absolute', top: 300, left: 200,
  }

  const mapButtonStyle = {
    position: 'absolute', top: 300, left: 350,
  }

  const labelStyle = {
    position: 'absolute', top: 200, left: 200,
  }

  const albumGalleryStyle = {
    position: 'absolute', top: 400, left: 200,
  }

  return (
    <div>
      <div id="Button Bar">
        <Button variant="outlined" style={newImageStyle} onClick={handleOpen}>Add Photo</Button>
        <Button variant="outlined" style={mapButtonStyle} onClick={handleOpenMap}>View Map</Button>
        <Modal
          open={openMap}
          onClose={handleCloseMap}
        >
          <Maps coordinates={coordinates} titleArr={titleArr} />
        </Modal>
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
