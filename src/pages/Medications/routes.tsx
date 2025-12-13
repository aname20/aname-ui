import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'
import { Medications } from './Medications'
import { AddMedication } from './pages/AddMedication'
import { EditMedication } from './pages/EditMedication'
import { ViewMedication } from './pages/ViewMedication'

/**
 * Retorna todas as rotas relacionadas a Medications
 * Todas as rotas têm o prefixo "/remedios"
 *
 * Este é um array de elementos Route que pode ser espalhado dentro de <Routes>
 */
export const medicationRoutes = [
  <Route
    key="medications-list"
    path="/remedios"
    element={
      <PrivateLayout title="Remédios">
        <Medications />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-add"
    path="/remedios/novo"
    element={
      <PrivateLayout title="Novo Remédio">
        <AddMedication />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-edit"
    path="/remedios/:id/editar"
    element={
      <PrivateLayout title="Editar Remédio">
        <EditMedication />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-view"
    path="/remedios/:id"
    element={
      <PrivateLayout title="Remédio">
        <ViewMedication />
      </PrivateLayout>
    }
  />,
]

