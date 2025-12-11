import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { agendaRoutes } from '@/pages/Agenda/pages/routes'
import { Login } from '@/pages/Auth/pages/Login'
import { Register } from '@/pages/Auth/pages/Register'
import { dependentsRoutes } from '@/pages/Dependents/pages/routes'
import { documentsRoutes } from '@/pages/Documents/pages/routes'
import { homeRoutes } from '@/pages/Home/pages/routes'
import { Medications } from '@/pages/Medications'
import { profileRoutes } from '@/pages/Profile'
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
      {homeRoutes}

      <Route
        path="/medications"
        element={
          <PrivateLayout>
            <Medications />
          </PrivateLayout>
        }
      />

      {agendaRoutes}

      {documentsRoutes}

      {dependentsRoutes}

      {profileRoutes}

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
