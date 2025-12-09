import { useAuthStore } from '@/stores/authStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { AuthInput } from '../../components/AuthInput/AuthInput'
import { registerSchema, type RegisterFormData } from './schemas/register.schema'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const register_user = useAuthStore((state) => state.register)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMessage(null)
      await register_user({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      navigate('/home')
    } catch {
      setErrorMessage('Erro ao criar conta. Tente novamente.')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #D7D6FF 0%, #456CE8 30%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/logo-white.svg"
          alt="AnAme"
          sx={{
            height: 60,
            width: 'auto',
            mb: 2,
          }}
        />

        {/* Subtítulo */}
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            mb: 4,
            fontSize: '0.9rem',
          }}
        >
          Preencha seus dados para acessar o aplicativo
        </Typography>

        {/* Formulário */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {errorMessage}
            </Alert>
          )}

          <AuthInput
            {...register('name')}
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <AuthInput
            {...register('email')}
            label="E-mail"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <AuthInput
            {...register('password')}
            label="Senha"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <AuthInput
            {...register('confirmPassword')}
            label="Confirmar Senha"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            sx={{
              backgroundColor: 'white',
              color: '#7C5FFF',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                color: 'rgba(124, 95, 255, 0.5)',
              },
            }}
          >
            {isSubmitting ? 'Criando...' : 'Finalizar Cadastro'}
          </Button>

          {/* Link */}
          <Box sx={{ mt: 2 }}>
            <Link
              onClick={() => navigate('/login')}
              underline="hover"
              sx={{
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Voltar para o Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

