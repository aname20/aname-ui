import { DocumentForms } from '@/pages/Documents/components/DocumentForms'
import { useDocumentById, useUpdateDocument } from '@/services/documents'
import { useUploadFile } from '@/services/storage'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { documentEditSchema, type DocumentEditFormData } from './schemas/documentEdit.schema'

export const DocumentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [error, setError] = useState<string | null>(null)

  const { data: document, isLoading: isLoadingDocument } = useDocumentById(Number(id))

  const uploadFile = useUploadFile()
  const updateDocument = useUpdateDocument()

  const isSubmitting = uploadFile.isPending || updateDocument.isPending

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DocumentEditFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(documentEditSchema) as any,
    defaultValues: {
      title: '',
      dependentId: '',
      type: undefined,
      date: '',
      media: undefined,
      comments: '',
    },
  })

  useEffect(() => {
    if (document) {
      reset({
        title: document.title,
        dependentId: document.dependent.id,
        type: document.type,
        date: document.date.split('T')[0],
        media: undefined,
        comments: document.comments || '',
      })
    }
  }, [document, reset])

  const onSubmit = async (data: DocumentEditFormData) => {
    try {
      setError(null)

      let fileUrl = document?.fileUrl

      if (data.media) {
        const uploadResponse = await uploadFile.mutateAsync(data.media)
        fileUrl = uploadResponse.url
      }

      await updateDocument.mutateAsync({
        id: Number(id),
        data: {
          title: data.title,
          type: data.type,
          date: data.date,
          fileUrl,
          comments: data.comments || undefined,
        },
      })

      navigate(`/documentos/${id}`)
    } catch {
      setError('Erro ao atualizar documento. Tente novamente.')
    }
  }

  const handleCancel = () => {
    navigate(`/documentos/${id}`)
  }

  const handleCloseError = () => {
    setError(null)
  }

  if (isLoadingDocument) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#456CE8' }} />
      </Box>
    )
  }

  if (!document) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" sx={{ color: '#d32f2f', mb: 2 }}>
          Documento não encontrado
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/documentos')}
          sx={{ color: '#456CE8', borderColor: '#456CE8' }}
        >
          Voltar para lista
        </Button>
      </Box>
    )
  }

  return (
    <>
      <DocumentForms
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={control as any}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        submitLabel="Atualizar"
        isSubmitting={isSubmitting}
        existingFileUrl={document.fileUrl}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}
