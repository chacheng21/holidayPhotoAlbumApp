import React, { useState } from 'react'
import AWS from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from 'util'
import securityCredentials from '../../../aws_info'

const randomBytes = promisify(crypto.randomBytes)

const ImageUpload = () => {
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
      setImageLink(`https://cis-197-images.s3.amazonaws.com/${imageName}`)
      setIsUploaded(true)
    }, err => {
      console.log(err)
    })
  }

  const imageStyle = {
    width: 200,
  }

  return (
    <div className="UploadImage">
      <form>
        <input type="file" onChange={e => upload(e)} />
        <br />
        { isUploaded
          && <img style={imageStyle} src={imageLink} alt="" />}
      </form>
    </div>
  )
}

export default ImageUpload
