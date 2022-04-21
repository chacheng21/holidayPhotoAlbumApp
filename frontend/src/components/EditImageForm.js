/* eslint-disable no-alert */
import React, { useState } from 'react'
import {
  Box, TextField, Button, Typography,
} from '@mui/material'
import axios from 'axios'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import ImageUpload from './ImageUpload'
import GoogleMaps from './PlacesSearchbar'

const EditImageForm = ({
  _id, title2, setTitle, place2, setPlace, description2, setDescription, date2, setDate, albumID, setOpen,
}) => {
  const [imageTitle, setImageTitle] = useState(title2)
  const [imageDescription, setImageDescription] = useState(description2)
  const [imagePlace, setImagePlace] = useState(place2)
  const [placeCoordinates, setPlaceCoordinates] = useState([])
  const [imageDate, setImageDate] = useState(date2)

  const handleNewDate = newDate => {
    setImageDate(newDate)
  }

  const submit = async () => {
    try {
      const res = await axios.post(`/album/${albumID}/edit`, {
        _id, description: imageDescription, title: imageTitle, date: imageDate.toString(), place: imagePlace, coordinate: placeCoordinates,
      })
      setTitle(imageTitle)
      setPlace(imagePlace)
      setDescription(imageDescription)
      setDate(imageDate)
      setOpen(false)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <div>
      <Box
        padding={3}
        spacing={2}
        border={4}
        borderRadius={3}
        borderColor="grey.100"
        width={500}
        bgcolor="background.paper"
        position="absolute"
        top={25}
        left={700}
        sx={{
          '& > :not(style)': { m: 2, width: '55ch' },
        }}
      >
        <Typography variant="h5">Edit Post</Typography>
        <TextField id="outlined-basic" label="Title" variant="outlined" value={imageTitle} onChange={e => setImageTitle(e.target.value)} />
        <TextField id="outlined-basic" label="Description" variant="outlined" value={imageDescription} onChange={e => setImageDescription(e.target.value)} />
        <TextField id="outlined-basic" label="Place" variant="outlined" value={imagePlace} onChange={e => setImagePlace(e.target.value)} />
        <br />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Album Date"
            inputFormat="MM/dd/yyyy"
            value={imageDate}
            onChange={handleNewDate}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <GoogleMaps setPlaceCoordinates={setPlaceCoordinates} />
        <Button variant="outlined" onClick={() => submit()}>Edit Post</Button>
        <br />
      </Box>
    </div>
  )
}

export default EditImageForm
