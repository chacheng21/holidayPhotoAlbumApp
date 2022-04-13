/* eslint-disable no-alert */
import React, { useState } from 'react'
import {
  Box, TextField, Button, Typography,
} from '@mui/material'
import axios from 'axios'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'

const QuestionForm = ({ setOpen }) => {
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumDate, setAlbumDate] = useState(Date.now())

  const handleNewDate = newDate => {
    setAlbumDate(newDate)
  }

  const submit = async () => {
    try {
      console.log(albumDate.toString())
      const res = await axios.post('/albums/add', { title: albumTitle, date: albumDate.toString() })
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
        width={350}
        bgcolor="background.paper"
        position="absolute"
        top={250}
        left={750}
        sx={{
          '& > :not(style)': { m: 2, width: '40ch' },
        }}
      >
        <Typography variant="h5">Create A New Album</Typography>
        <TextField id="outlined-basic" label="Album Name" variant="outlined" onChange={e => setAlbumTitle(e.target.value)} />
        <br />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Album Date"
            inputFormat="MM/dd/yyyy"
            value={albumDate}
            onChange={handleNewDate}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <Button variant="outlined" onClick={() => submit()}>Create New Album</Button>
        <br />
      </Box>
    </div>
  )
}

export default QuestionForm
