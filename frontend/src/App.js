import React, { useState } from 'react'
import AWS from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from 'util'
import securityCredentials from '../../aws_info'

const randomBytes = promisify(crypto.randomBytes)

const App = () => {
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
    await s3.putObject({
      Body: e.target.files[0],
      Bucket: 'cis-197-images',
      Key: imageName,
    })
  }

  const submitForm = () => {

  }

  return (
    <div className="App">
      <form>
        <input type="file" onChange={e => upload(e)} />
        <button type="submit" onClick={() => submitForm()}>Submit</button>
      </form>
    </div>
  )
}

export default App
