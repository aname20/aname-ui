import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'

import { ProfileDetails } from './ProfileDetails'
import { ProfileEdit } from './ProfileEdit/ProfileEdit'

export const profileRoutes = [
  <Route
    key="Profile-details"
    path="/perfil"
    element={
      <PrivateLayout title="Meu Perfil">
        <ProfileDetails />
      </PrivateLayout>
    }
  />,
  <Route
    key="Profile-edit"
    path="/perfil/editar"
    element={
      <PrivateLayout title="Editar Perfil">
        <ProfileEdit />
      </PrivateLayout>
    }
  />,
]

