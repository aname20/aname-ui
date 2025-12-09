# Desenvolvimento Frontend

## Componentes

### Tipos de Componentes

**Apresentação** - Apenas UI, sem lógica:

```typescript
interface CardProps {
  title: string
  description: string
}

export const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Paper>
  )
}
```

**Container** - Gerenciam lógica e estado:

```typescript
export const MedicationList: React.FC = () => {
  const { data, isLoading } = useMedications()

  if (isLoading) return <LoadingSpinner />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data?.items.map((med) => (
        <MedicationCard key={med.id} medication={med} />
      ))}
    </Box>
  )
}
```

### Estrutura de Componente Complexo

```
Card/
├── index.tsx        # Re-exports
├── Card.tsx         # Componente principal
├── types.ts         # Types específicos
├── utils.ts         # Utils específicos
└── hooks.ts         # Hooks específicos
```

Crie arquivos locais quando o código é usado **apenas** nesse componente.

### Organização

- **common/**: Button, Input, Card, Modal, LoadingSpinner
- **forms/**: FormInput, FormSelect, FormDatePicker
- **layouts/**: DefaultLayout, AuthLayout

## Formulários

### Stack

- **React Hook Form**: Gerenciamento
- **Yup**: Validação
- **Material-UI**: UI

### 1. Schema de Validação

```typescript
// src/validation/user.schema.ts
import * as yup from 'yup'

export const userSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'Mínimo 3 caracteres'),

  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),

  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato: (99) 99999-9999')
    .optional(),
})

export type UserFormData = yup.InferType<typeof userSchema>
```

### 2. Componente de Formulário

```typescript
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserFormData } from '@/validation/user.schema'

export const UserForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async (data: UserFormData) => {
    // Enviar para API
    console.log(data)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </Box>
  )
}
```

### Validações Comuns

```typescript
// CPF
cpf: yup
  .string()
  .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')

// CEP
cep: yup
  .string()
  .matches(/^\d{5}-\d{3}$/, 'CEP inválido')

// Senha forte
password: yup
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .matches(/[a-z]/, 'Deve conter minúsculas')
  .matches(/[A-Z]/, 'Deve conter maiúsculas')
  .matches(/[0-9]/, 'Deve conter números')
```

### Tratamento de Erros

```typescript
const onSubmit = async (data: FormData) => {
  try {
    await api.post('/users', data)
  } catch (error) {
    // Mapear erros do servidor
    if (error.response?.status === 422) {
      const serverErrors = error.response.data.errors
      Object.keys(serverErrors).forEach((key) => {
        setError(key, { message: serverErrors[key] })
      })
    }
  }
}
```

## Estilização

### Stack

- **Material-UI**: Componentes e design system
- **sx prop**: Estilização inline (preferencial)
- **styled()**: Para componentes reutilizáveis

### Tema MUI

```typescript
// src/theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#456CE8' },
    secondary: { main: '#FF6B9D' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    button: { textTransform: 'none' },
  },
  spacing: 8, // 1 unit = 8px
})
```

### Prop `sx` (Preferencial)

```typescript
<Box
  sx={{
    p: 2,                    // padding: 16px
    bgcolor: 'primary.main',
    borderRadius: 2,
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  }}
>
  Conteúdo
</Box>
```

**Spacing:**
```typescript
<Box
  sx={{
    m: 2,        // margin: 16px
    mt: 1,       // margin-top: 8px
    mx: 'auto',  // margin horizontal: auto
    p: 2,        // padding: 16px
  }}
/>
```

**Layout:**
```typescript
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: 2,
  }}
/>
```

### Responsividade

**Breakpoints:**
```
xs: 0px    (mobile)
sm: 600px  (tablet)
md: 900px  (desktop)
lg: 1200px (large)
```

**Uso:**
```typescript
<Box
  sx={{
    width: {
      xs: '100%',    // mobile: 100%
      md: '50%',     // desktop: 50%
    },
    padding: {
      xs: 1,         // mobile: 8px
      md: 3,         // desktop: 24px
    },
  }}
/>
```

**Grid:**
```typescript
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* 100% mobile, 50% tablet, 33% desktop */}
    <Card />
  </Grid>
</Grid>
```

### styled-components

Para componentes reutilizáveis:

```typescript
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))
```

## Boas Práticas

**Componentes:**
- Sempre tipar props com TypeScript
- Extrair lógica em hooks customizados
- Props com valores padrão quando opcional

**Formulários:**
- Separe schemas em `src/validation/*.schema.ts`
- Use `yup.InferType` para tipos automáticos
- Feedback claro de erros abaixo dos campos
- Loading state durante submissão

**Estilização:**
- Use tokens do tema: `primary.main` ao invés de `#456CE8`
- Prefira `sx` para estilos únicos
- Use `styled()` para componentes reutilizados
- Mobile first: estilos base para mobile, breakpoints para desktop

## Referências

- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

