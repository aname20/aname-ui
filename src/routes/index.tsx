import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { Login, Register } from '@/pages/Auth'
import { Home } from '@/pages/Home'
import { Medications } from '@/pages/Medications'
import { Settings } from '@/pages/Settings'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota raiz redireciona para /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Rotas Públicas */}
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        }
      />

      {/* Rotas Privadas */}
      <Route
        path="/home"
        element={
          <PrivateLayout>
            <Home />
          </PrivateLayout>
        }
      />
      <Route
        path="/medications"
        element={
          <PrivateLayout>
            <Medications />
          </PrivateLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateLayout>
            <Settings />
          </PrivateLayout>
        }
      />
    </Routes>
  )
}
