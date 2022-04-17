/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardActions, CardContent, CardActionArea, Button, Typography,
} from '@mui/material'
import axios from 'axios'

const Photo = ({ setUpdate, update, photo }) => {
  const navigate = useNavigate()

  const {
    _id, image, title, place, coordinate, description,
  } = photo

  let { date } = photo
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

  const openImage = () => {
    navigate('photo', {
      _id, image, title, place, coordinate, description,
    })
  }

  const deleteImage = async () => {
    const res = await axios.post(`/album/${_id}/delete`, { _id })
    setUpdate(!update)
  }

  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete this album?')) {
      deleteImage()
    }
  }

  const imageStyle = {
    width: 400,
    height: 400,
    objectFit: 'cover',
    cursor: 'pointer',
  }

  const divStyle = {
    backgroundColor: 'gray',
    borderRadius: 4,
    padding: 10,
  }

  return (
    <div>
      <img
        style={imageStyle}
        src={`${image}`}
        alt={title}
        onClick={() => openImage()}
        loading="lazy"
      />
      <Typography variant="h4" component="div">
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {`${dateString}, ${place}`}
      </Typography>
      <Button color="error" onClick={confirmDelete}>Delete</Button>
    </div>
  )
}

export default Photo

// < div key = { _id } >
//     <img
//       style={style}
//       src={`${image}`}
//       alt={title}
//       loading="lazy"
//     />
//     <ImageListItemBar
//       title={title}
//       subtitle={`${dateString}, ${place}`}
//     />
//   </div >
