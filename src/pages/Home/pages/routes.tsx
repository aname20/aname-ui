import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'
import { Home } from './Home/Home'

export const homeRoutes = [
  <Route
    key="home"
    path="/home"
    element={
      <PrivateLayout>
        <Home />
      </PrivateLayout>
    }
  />,
]

