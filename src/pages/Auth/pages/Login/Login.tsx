import { useAuthStore } from '@/stores/authStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { AuthInput } from '../../components/AuthInput/AuthInput'
import { loginSchema, type LoginFormData } from './schemas/login.schema'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null)
      await login({ email: data.email, password: data.password })
      navigate('/home')
    } catch {
      setErrorMessage('E-mail ou senha incorretos. Tente novamente.')
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
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>

          {/* Links */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: 'white',
                fontSize: '1rem',
              }}
            >
              Esqueceu sua senha?
            </Link>
            <Link
              onClick={() => navigate('/register')}
              underline="hover"
              sx={{
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Cadastre-se
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

