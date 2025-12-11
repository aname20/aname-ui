import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { Route } from 'react-router'

import { DocumentDetails } from './DocumentDetails'
import { DocumentEdit } from './DocumentEdit'
import { DocumentList } from './DocumentList'
import { DocumentNew } from './DocumentNew'

export const documentsRoutes = [
  <Route
    key="Document-list"
    path="/documentos"
    element={
      <PrivateLayout title="Documento">
        <DocumentList />
      </PrivateLayout>
    }
  />,
  <Route
    key="Document-new"
    path="/documentos/novo"
    element={
      <PrivateLayout title="Novo Documento">
        <DocumentNew />
      </PrivateLayout>
    }
  />,
  <Route
    key="Document-edit"
    path="/documentos/:id/editar"
    element={
      <PrivateLayout title="Editar Documento">
        <DocumentEdit />
      </PrivateLayout>
    }
  />,
  <Route
    key="Document-details"
    path="/documentos/:id"
    element={
      <PrivateLayout title="Documento">
        <DocumentDetails />
      </PrivateLayout>
    }
  />,
]