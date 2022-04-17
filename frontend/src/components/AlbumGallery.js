/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Typography, Modal, Grid,
} from '@mui/material'
import AlbumComponent from './AlbumComponent'

const AlbumGallery = ({ albums, update, setUpdate }) => (
  <div>
    <Grid sx={{ flexGrow: 1 }} container spacing={8}>
      {albums.map((album3, index) => (
        <>
          <Grid item xs={12} key={index}>
            <Grid container justifyContent="left" spacing={12}>
              {album3.map(album => (
                <Grid item key={album._id}>
                  <AlbumComponent album={album} update={update} setUpdate={setUpdate} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <br />
          <br />
        </>
      ))}
    </Grid>
  </div>
)

export default AlbumGallery
