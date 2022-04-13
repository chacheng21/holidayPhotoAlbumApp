/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardActions, CardContent, Typography, Button, CardActionArea,
} from '@mui/material'

const AlbumComponent = ({ album }) => {
  const navigate = useNavigate()

  const { _id } = album
  let { date } = album
  date = new Date(date)

  let month = date.getMonth()
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
              Location
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="error">Delete</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default AlbumComponent
