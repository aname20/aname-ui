import React from 'react'
import { Routes, Route } from 'react-router'
import { Home } from '../pages/Home'
import { Medications } from '../pages/Medications'
import { Settings } from '../pages/Settings'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
