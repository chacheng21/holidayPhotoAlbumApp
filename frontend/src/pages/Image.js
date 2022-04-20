/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Modal, Box, TextField, Button, Typography,
} from '@mui/material'
import Maps from '../components/Maps'
import EditImageForm from '../components/EditImageForm'

const Image = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openMap, setOpenMap] = useState(false)
  const handleOpenMap = () => setOpenMap(true)
  const handleCloseMap = () => setOpenMap(false)

  const {
    _id, image, title, place, coordinate, description, albumID, date,
  } = location.state

  const [title2, setTitle] = useState(title)
  const [place2, setPlace] = useState(place)
  const [description2, setDescription] = useState(description)
  const [date2, setDate] = useState(date)
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }

    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }

    setDateString(`${date.getFullYear()}-${month}-${day}`)
  }, [date2])

  const imageStyle = {
    width: 800,
  }

  const backToAlbumStyle = {
    position: 'absolute',
    top: 100,
    left: 550,
  }

  const logoutStyle = {
    position: 'absolute',
    top: 100,
    left: 1255,
  }

  const titleStyle = {
    position: 'absolute',
    top: 150,
    left: 550,
  }

  const editStyle = {
    position: 'absolute',
    top: 210,
    left: 550,
  }

  const viewMapsStyle = {
    position: 'absolute',
    top: 210,
    left: 650,
  }

  const contentStyle = {
    position: 'absolute',
    top: 275,
    left: 550,
  }

  const goAlbum = () => {
    navigate(`/album/${albumID}`)
  }

  const logout = async () => {
    const logoutRes = await axios.post('/account/logout')
    navigate('/login')
  }

  return (
    <>
      <Button style={backToAlbumStyle} onClick={goAlbum} variant="outlined">Back To Album</Button>
      <Button style={logoutStyle} onClick={logout} color="error" variant="outlined">Logout</Button>
      <Typography style={titleStyle} variant="h4">{title2}</Typography>
      <Button style={editStyle} variant="outlined" onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <EditImageForm
          _id={_id}
          title2={title2}
          setTitle={setTitle}
          place2={place2}
          setPlace={setPlace}
          description2={description2}
          setDescription={setDescription}
          date2={date2}
          setDate={setDate}
          albumID={albumID}
        />
      </Modal>

      <Button style={viewMapsStyle} variant="outlined" onClick={handleOpenMap}>View Map</Button>
      <Modal
        open={openMap}
        onClose={handleCloseMap}
      >
        <Maps coordinates={[coordinate]} titleArr={[title]} />
      </Modal>

      <div style={contentStyle}>
        <img
          style={imageStyle}
          src={`${image}`}
          alt={title2}
          loading="lazy"
        />
        <br />
        <Typography variant="h6" color="text.secondary">{`${dateString}, ${place2}`}</Typography>
        <p>{ description2 }</p>
      </div>
    </>
  )
}

export default Image
