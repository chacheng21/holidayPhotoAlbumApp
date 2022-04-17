/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardActions, CardContent, Typography, Button, CardActionArea, Modal,
} from '@mui/material'
import axios from 'axios'
import EditAlbumForm from './EditAlbumForm'

const AlbumComponent = ({ album, update, setUpdate }) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { _id } = album
  let { date } = album
  date = new Date(date)

  let month = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }

  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }

  const dateString = `${date.getFullYear()}-${month}-${day}`

  const openAlbum = () => {
    navigate(`/album/${_id}`)
  }

  const deleteAlbum = async () => {
    const res = await axios.post('/albums/delete', { _id })
    setUpdate(!update)
  }

  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete this album?')) {
      deleteAlbum()
    }
  }

  return (
    <div>
      <Card sx={{ minWidth: 350 }} elevation={6}>
        <CardActionArea onClick={() => openAlbum()}>
          <CardContent>
            <Typography variant="h4" component="div">
              {album.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {dateString}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {album.place}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={handleOpen}>Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <EditAlbumForm setOpen={setOpen} date={date} album={album} update={update} setUpdate={setUpdate} />
          </Modal>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default AlbumComponent
