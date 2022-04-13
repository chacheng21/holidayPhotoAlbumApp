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

  const login = async () => {
    try {
      const res = await axios.post('/account/login', { username, password })
      if (res.data !== 'Login Successful') {
        alert(res.data)
      } else {
        navigate('../')
      }
    } catch (error) {
      alert(error.response.data)
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
        <Typography variant="h3">Login</Typography>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
        <br />
        <TextField id="outlined-basic-input" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
        <br />
        <Button variant="outlined" onClick={() => login()}>Login</Button>
        <br />
        <Typography variant="h5">Want to make an account?</Typography>
        <Link href="/signup" underline="hover"> Sign up here! </Link>
      </Box>
      {/* Want to make an account?
      <br />
      <Link to="/signup">Sign up here!</Link> */}
    </div>
  )
}

export default Signup
