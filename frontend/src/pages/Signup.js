/* eslint-disable no-alert */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, TextField, Button, Typography, Link,
} from '@mui/material'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createUser = async () => {
    try {
      const res = await axios.post('/account/signup', { username, password })
      if (res.data !== 'user creation was successful') {
        alert(res.data)
      } else {
        navigate('../')
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.includes('error: E11000 duplicate key error collection')) {
        alert('Username already exists')
      }
    }
  }

  const style = {
    position: 'absolute',
    top: 200,
    left: 700,
  }

  return (
    <div style={style}>
      <Box
        padding={3}
        spacing={2}
        border={4}
        borderRadius={3}
        borderColor="grey.100"
        width={500}
        sx={{
          '& > :not(style)': { m: 2, width: '40ch' },
        }}
      >
        <Typography variant="h3">Signup</Typography>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
        <br />
        <TextField id="outlined-basic-input" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
        <br />
        <Button variant="outlined" onClick={() => createUser()}>Signup</Button>
        <br />
        <Typography variant="h5">Already have an account?</Typography>
        <Link href="/login" underline="hover"> Login here! </Link>
      </Box>
    </div>
  )
}

export default Signup
