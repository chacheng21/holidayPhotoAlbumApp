import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Albums from './pages/Albums'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Albums />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default App
