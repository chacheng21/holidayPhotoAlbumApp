/* eslint-disable no-alert */
import React, { useState } from 'react'
import {
  Box, TextField, Button, Typography,
} from '@mui/material'
import axios from 'axios'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import { toUnitless } from '@mui/material/styles/cssUtils'

const EditAlbumForm = ({
  setOpen, album, update, setUpdate,
}) => {
  const [albumTitle, setAlbumTitle] = useState(album.title)
  const [albumDate, setAlbumDate] = useState(new Date(album.date))
  const [albumPlace, setAlbumPlace] = useState(album.place)

  const handleNewDate = newDate => {
    setAlbumDate(newDate)
  }

  const submit = async () => {
    try {
      const res = await axios.post('/albums/edit', {
        _id: album._id, title: albumTitle, date: albumDate.toString(), place: albumPlace,
      })
      setOpen(false)
      setUpdate(!update)
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
        <Typography variant="h5">
          Edit Album
          {' '}
          {album.title}
        </Typography>
        <TextField id="outlined-basic" label="Album Name" variant="outlined" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} />
        <TextField id="outlined-basic" label="Place" variant="outlined" value={albumPlace} onChange={e => setAlbumPlace(e.target.value)} />
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
        <Button variant="outlined" onClick={() => submit()}>Edit Album</Button>
        <br />
      </Box>
    </div>
  )
}

export default EditAlbumForm
