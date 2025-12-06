import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { Login } from '@/pages/Auth/pages/Login'
import { Register } from '@/pages/Auth/pages/Register'
import { Home } from '@/pages/Home'
import { medicationRoutes } from '@/pages/Medications/routes'
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

      {/* Rotas de Medications */}
      {medicationRoutes}

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
