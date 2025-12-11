import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Medications } from './Medications'
import { AddMedication } from './pages/AddMedication'
import { EditMedication } from './pages/EditMedication'
import { ViewMedication } from './pages/ViewMedication'
import { Route } from 'react-router'

/**
 * Retorna todas as rotas relacionadas a Medications
 * Todas as rotas têm o prefixo "/medications"
 *
 * Este é um array de elementos Route que pode ser espalhado dentro de <Routes>
 */
export const medicationRoutes = [
  <Route
    key="medications-list"
    path="/medications"
    element={
      <PrivateLayout>
        <Medications />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-add"
    path="/medications/add"
    element={
      <PrivateLayout>
        <AddMedication />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-edit"
    path="/medications/edit/:id"
    element={
      <PrivateLayout>
        <EditMedication />
      </PrivateLayout>
    }
  />,
  <Route
    key="medications-view"
    path="/medications/:id"
    element={
      <PrivateLayout>
        <ViewMedication />
      </PrivateLayout>
    }
  />,
]

