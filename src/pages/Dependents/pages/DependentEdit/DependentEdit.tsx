import { DependentForms } from '@/pages/Dependents/components/DependentForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { dependentNewSchema, type DependentNewFormData } from '../DependentNew/schemas/dependentNew.schema'

// Mock data - substituir por chamada à API
const mockDependent = {
  id: '1',
  name: 'Graça Lima',
  age: 35,
  susCode: '123456789012345',
  avatar: null,
  conditions: ['Diabetes', 'Hipertensão'],
  allergies: ['Dipirona', 'Lactose'],
  caregivers: ['João Silva'],
  emergencyContacts: [
    { name: 'Carlos Lima', phone: '(11) 98765-4321' },
    { name: 'Ana Santos', phone: '(11) 91234-5678' },
  ],
}

export const DependentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // TODO: Buscar dados reais da API usando o id
  const dependent = mockDependent

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dependentNewSchema),
    defaultValues: {
      name: dependent.name,
      age: dependent.age,
      susCode: dependent.susCode,
      avatar: dependent.avatar,
      conditions: dependent.conditions,
      allergies: dependent.allergies,
      caregivers: dependent.caregivers,
      emergencyContacts: dependent.emergencyContacts,
    },
  })

  const onSubmit = async (data: DependentNewFormData) => {
    try {
      // TODO: Implementar chamada à API para atualizar
      console.log('Dados atualizados:', data, 'ID:', id)
      navigate(`/dependentes/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar dependente:', error)
    }
  }

  const handleCancel = () => {
    navigate(`/dependentes/${id}`)
  }

  return (
    <DependentForms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control={control as any}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitLabel="Atualizar"
    />
  )
}

