import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'

import { DependentDetails } from './DependentDetails'
import { DependentEdit } from './DependentEdit'
import { DependentList } from './DependentList'
import { DependentNew } from './DependentNew'

export const dependentsRoutes = [
  <Route
    key="Dependent-list"
    path="/dependentes"
    element={
      <PrivateLayout title="Dependentes">
        <DependentList />
      </PrivateLayout>
    }
  />,
  <Route
    key="Dependent-new"
    path="/dependentes/novo"
    element={
      <PrivateLayout title="Novo Dependente">
        <DependentNew />
      </PrivateLayout>
    }
  />,
  <Route
    key="Dependent-edit"
    path="/dependentes/:id/editar"
    element={
      <PrivateLayout title="Editar Dependente">
        <DependentEdit />
      </PrivateLayout>
    }
  />,
  <Route
    key="Dependent-details"
    path="/dependentes/:id"
    element={
      <PrivateLayout title="Dependente">
        <DependentDetails />
      </PrivateLayout>
    }
  />,
]

