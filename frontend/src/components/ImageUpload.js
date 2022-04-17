import React, { useState } from 'react'
import AWS from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from 'util'
import { Button, Input } from '@mui/material'
import securityCredentials from '../../../aws_info'

const randomBytes = promisify(crypto.randomBytes)

const ImageUpload = ({ setImageURL }) => {
  const [isUploaded, setIsUploaded] = useState(false)
  const [imageLink, setImageLink] = useState('')
  const upload = async e => {
    AWS.config.update({
      accessKeyId: securityCredentials.accessKeyId,
      secretAccessKey: securityCredentials.secretAccessKey,
      region: 'us-east-1',
    })

    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    // IMAGE LINK (img src): https://cis-197-images.s3.amazonaws.com/${imageName}

    const s3 = new AWS.S3()
    const uploadParams = {
      Body: e.target.files[0],
      Bucket: 'cis-197-images',
      Key: imageName,
    }

    await s3.upload(uploadParams).promise().then(data => {
      setImageURL(`https://cis-197-images.s3.amazonaws.com/${imageName}`)
      setImageLink(`https://cis-197-images.s3.amazonaws.com/${imageName}`)
      setIsUploaded(true)
    }, err => {
      console.log(err)
    })
  }

  const imageStyle = {
    height: 250,
  }

  return (
    <div className="UploadImage">
      <Button
        variant="contained"
        component="label"
      >
        <input type="file" hidden onChange={e => upload(e)} />
        Upload Image
      </Button>
      <br />
      <br />
      {isUploaded
        && <img style={imageStyle} src={imageLink} alt="" />}
    </div>
  )
}

export default ImageUpload
