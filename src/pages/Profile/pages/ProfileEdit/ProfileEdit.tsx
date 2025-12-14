import { PrimaryInput } from '@/components/forms/PrimaryInput'
import { errorToast, successToast } from '@/hooks/useToast'
import { useUpdateUser } from '@/services/users/users.hooks'
import { useAuthStore } from '@/stores/authStore'
import { formatPhoneNumber } from '@/utils/phone'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { profileEditSchema, type ProfileEditFormData } from './schemas/profileEdit.schema'

export const ProfileEdit = () => {
  const navigate = useNavigate()
  const userFromStore = useAuthStore((state) => state.user)
  const updateUser = useUpdateUser()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileEditFormData>({
    resolver: yupResolver(profileEditSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (userFromStore) {
      const formattedPhone = userFromStore.phone ? formatPhoneNumber(userFromStore.phone) : ''

      reset({
        name: userFromStore.name,
        email: userFromStore.email,
        phone: formattedPhone,
      })
    }
  }, [userFromStore, reset])

  const onSubmit = async (data: ProfileEditFormData) => {
    if (!userFromStore?.id) return

    try {
      const phoneNumbersOnly = data.phone ? data.phone.replace(/\D/g, '') : undefined

      const updatedUser = await updateUser.mutateAsync({
        id: userFromStore.id,
        data: {
          name: data.name,
          email: data.email,
          phone: phoneNumbersOnly || undefined,
        },
      })

      // Atualizar o store do Zustand diretamente com os dados atualizados
      useAuthStore.setState({ user: updatedUser })

      successToast('Perfil atualizado com sucesso')
      navigate('/perfil')
    } catch {
      errorToast('Erro ao atualizar perfil. Tente novamente.')
    }
  }

  const handleCancel = () => {
    navigate('/perfil')
  }

  if (!userFromStore) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pb: 2, pt: 2 }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="E-mail"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Telefone"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ mb: 2 }}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value)
              field.onChange(formatted)
            }}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button fullWidth variant="outlined" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{
            bgcolor: '#456CE8',
            '&:hover': {
              bgcolor: '#3557c9',
            },
          }}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  )
}
