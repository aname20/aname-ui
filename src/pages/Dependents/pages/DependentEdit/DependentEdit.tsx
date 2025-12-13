import { DependentForms } from '@/pages/Dependents/components/DependentForms'
import { useDependentById, useDependentCaregivers, useUpdateDependent } from '@/services/dependents'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { dependentNewSchema } from '../DependentNew/schemas/dependentNew.schema'

export const DependentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: dependent, isLoading, isError } = useDependentById(id || '')

  const { data: caregivers = [] } = useDependentCaregivers(id || '')

  const updateDependent = useUpdateDependent()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(dependentNewSchema) as any,
    defaultValues: {
      name: '',
      age: undefined as number | undefined,
      susCode: '',
      avatar: null as File | null,
      conditions: [] as string[],
      allergies: [] as string[],
      caregiverIds: [] as string[],
      emergencyContacts: [] as { name: string; phone: string; kinship?: string }[],
    },
  })

  useEffect(() => {
    if (dependent) {
      reset({
        name: dependent.name,
        age: dependent.age,
        susCode: dependent.susCode || '',
        avatar: null,
        conditions: dependent.conditions || [],
        allergies: dependent.allergies || [],
        caregiverIds: caregivers.map(caregiver => caregiver.id),
        emergencyContacts: dependent.emergencyContacts?.map(contact => ({
          name: contact.name,
          phone: contact.phone,
          kinship: contact.kinship || '',
        })) || [],
      })
    }
  }, [dependent, caregivers, reset])

  const initialCaregivers = useMemo(() => {
    return caregivers.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      avatar: c.avatar,
    }))
  }, [caregivers])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (!id) return
    
    try {
      await updateDependent.mutateAsync({
        id,
        data: {
          name: data.name,
          age: data.age,
          susCode: data.susCode || undefined,
          conditions: data.conditions?.length > 0 ? data.conditions : undefined,
          allergies: data.allergies?.length > 0 ? data.allergies : undefined,
          caregiverIds: data.caregiverIds,
          emergencyContacts: data.emergencyContacts?.length > 0 
            ? data.emergencyContacts.map((contact: { name: string; phone: string; kinship?: string }) => ({
                name: contact.name,
                phone: contact.phone,
                kinship: contact.kinship || undefined,
              }))
            : undefined,
        },
      })
      navigate(`/dependentes/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar dependente:', error)
    }
  }

  const handleCancel = () => {
    navigate(`/dependentes/${id}`)
  }

  // Estado de carregamento
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  // Estado de erro
  if (isError || !dependent) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" sx={{ color: '#F44336' }}>
          Erro ao carregar dependente. Tente novamente.
        </Typography>
      </Box>
    )
  }

  return (
    <DependentForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue={setValue as any}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitLabel="Atualizar"
      isSubmitting={updateDependent.isPending}
      initialConditions={dependent.conditions || []}
      initialAllergies={dependent.allergies || []}
      initialCaregivers={initialCaregivers}
    />
  )
}
