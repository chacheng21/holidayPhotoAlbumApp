/* eslint-disable no-alert */
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box, TextField, Button, Typography,
} from '@mui/material'
import axios from 'axios'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import ImageUpload from './ImageUpload'

const QuestionForm = ({ setOpen, albumID }) => {
  const [imageURL, setImageURL] = useState('')
  const [imageTitle, setImageTitle] = useState('')
  const [imageDescription, setImageDescription] = useState('')
  const [imagePlace, setImagePlace] = useState('')
  const [imageCoordinate, setImageCoordinate] = useState([])
  const [imageDate, setImageDate] = useState(Date.now())

  const handleNewDate = newDate => {
    setImageDate(newDate)
  }

  const submit = async () => {
    try {
      const res = await axios.post(`/album/${albumID}/add`, {
        description: imageDescription, image: imageURL, title: imageTitle, date: imageDate.toString(), place: imagePlace,
      })
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
        top={75}
        left={700}
        sx={{
          '& > :not(style)': { m: 2, width: '55ch' },
        }}
      >
        <Typography variant="h5">Add a New Image</Typography>
        <TextField id="outlined-basic" label="Title" variant="outlined" onChange={e => setImageTitle(e.target.value)} />
        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={e => setImageDescription(e.target.value)} />
        <TextField id="outlined-basic" label="Place" variant="outlined" onChange={e => setImagePlace(e.target.value)} />
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
        <ImageUpload setImageURL={setImageURL} />
        <Button variant="outlined" onClick={() => submit()}>Create New Post</Button>
        <br />
      </Box>
    </div>
  )
}

export default QuestionForm
