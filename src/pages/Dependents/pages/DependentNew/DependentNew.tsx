import { DependentForms } from '@/pages/Dependents/components/DependentForms'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { dependentNewSchema, type DependentNewFormData } from './schemas/dependentNew.schema'

export const DependentNew = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dependentNewSchema),
    defaultValues: {
      name: '',
      age: '' as any,
      susCode: '',
      avatar: null,
      conditions: [],
      allergies: [],
      caregivers: [],
      emergencyContacts: [],
    },
  })

  const onSubmit = async (data: DependentNewFormData) => {
    try {
      // TODO: Implementar chamada à API
      console.log('Dados do formulário:', data)
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
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    />
  )
}

