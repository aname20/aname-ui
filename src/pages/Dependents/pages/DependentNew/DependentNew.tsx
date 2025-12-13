import { DependentForms } from '@/pages/Dependents/components/DependentForms'
import { useCreateDependent } from '@/services/dependents'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { dependentNewSchema } from './schemas/dependentNew.schema'

export const DependentNew = () => {
  const navigate = useNavigate()
  const createDependent = useCreateDependent()

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      await createDependent.mutateAsync({
        name: data.name,
        age: data.age,
        susCode: data.susCode || undefined,
        conditions: data.conditions?.length > 0 ? data.conditions : undefined,
        allergies: data.allergies?.length > 0 ? data.allergies : undefined,
        caregiverIds: data.caregiverIds?.length > 0 ? data.caregiverIds : undefined,
        emergencyContacts: data.emergencyContacts?.length > 0 
          ? data.emergencyContacts.map((contact: { name: string; phone: string; kinship?: string }) => ({
              name: contact.name,
              phone: contact.phone,
              kinship: contact.kinship || undefined,
            }))
          : undefined,
      })
      navigate('/dependentes')
    } catch (error) {
      console.error('Erro ao salvar dependente:', error)
    }
  }

  const handleCancel = () => {
    navigate('/dependentes')
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
      isSubmitting={createDependent.isPending}
    />
  )
}
