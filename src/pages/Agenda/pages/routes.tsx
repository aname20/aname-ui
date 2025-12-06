import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'
import { AgendaList } from './AgendaList'

export const agendaRoutes = [
  <Route
    key="agenda-list"
    path="/agenda"
    element={
      <PrivateLayout title="Agenda">
        <AgendaList />
      </PrivateLayout>
    }
  />,
]