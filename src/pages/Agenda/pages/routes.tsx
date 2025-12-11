import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'
import { AgendaDetails } from './AgendaDetails'
import { AgendaEdit } from './AgendaEdit'
import { AgendaList } from './AgendaList'
import { AgendaNew } from './AgendaNew'

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
  <Route
    key="agenda-new"
    path="/agenda/novo"
    element={
      <PrivateLayout title="Novo Agendamento">
        <AgendaNew />
      </PrivateLayout>
    }
  />,
  <Route
    key="agenda-edit"
    path="/agenda/:id/editar"
    element={
      <PrivateLayout title="Editar Agendamento">
        <AgendaEdit />
      </PrivateLayout>
    }
  />,
  <Route
    key="agenda-details"
    path="/agenda/:id"
    element={
      <PrivateLayout title="Agendamento">
        <AgendaDetails />
      </PrivateLayout>
    }
  />,
]