import * as React from 'react'
import {
  ImageList,
} from '@mui/material'
import Photo from './PhotoComponent'

const PhotoGallery = ({ setUpdate, update, images }) => (
  <ImageList sx={{ width: 1500, height: 1000 }} cols={3} gap={100}>
    {images.map(item => (
      <Photo photo={item} setUpdate={setUpdate} update={update} />
    ))}
  </ImageList>
)

export default PhotoGallery
