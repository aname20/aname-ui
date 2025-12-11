import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'

import { ProfileDetails } from './ProfileDetails'

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
]

