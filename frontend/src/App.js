import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Albums from './pages/Albums'
import Album from './pages/Album'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Image from './pages/Image'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Albums />} />
      <Route exact path="/album/:id" element={<Album />} />
      <Route exact path="/album/:id/photo" element={<Image />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default App
