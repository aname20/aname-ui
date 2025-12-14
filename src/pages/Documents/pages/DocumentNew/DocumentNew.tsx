import { DocumentForms } from '@/pages/Documents/components/DocumentForms'
import { useCreateDocument } from '@/services/documents'
import { useUploadFile } from '@/services/storage'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { documentNewSchema, type DocumentNewFormData } from './schemas/documentNew.schema'

export const DocumentNew = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useUploadFile()
  const createDocument = useCreateDocument()

  const isSubmitting = uploadFile.isPending || createDocument.isPending

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentNewSchema),
    defaultValues: {
      title: '',
      dependentId: '',
      type: undefined,
      date: '',
      media: undefined,
      comments: '',
    },
  })

  const onSubmit = async (data: DocumentNewFormData) => {
    try {
      setError(null)

      const uploadResponse = await uploadFile.mutateAsync(data.media as File)

      await createDocument.mutateAsync({
        title: data.title,
        dependentId: data.dependentId,
        type: data.type,
        date: data.date,
        fileUrl: uploadResponse.url,
        comments: data.comments || undefined,
      })

      navigate('/documentos')
    } catch {
      setError('Erro ao salvar documento. Tente novamente.')
    }
  }

  const handleCancel = () => {
    navigate('/documentos')
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <>
      <DocumentForms
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={control as any}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
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
