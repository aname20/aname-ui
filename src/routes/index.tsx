import React from 'react'
import { Routes, Route } from 'react-router'
import { Home } from '../pages/Home'
import { Medications } from '../pages/Medications'
import { Settings } from '../pages/Settings'
import { AddMedication } from '../pages/Medications/pages/AddMedication'
import { ViewMedication } from '../pages/Medications/pages/ViewMedication'
import { EditMedication } from '../pages/Medications/pages/EditMedication'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/medications/add" element={<AddMedication />} />
      <Route path="/medications/view/:id" element={<ViewMedication />} />
      <Route path="/medications/edit/:id" element={<EditMedication />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
