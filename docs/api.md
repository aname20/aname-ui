# API e Integração de Dados

## Stack

- **Axios**: Cliente HTTP
- **React Query**: Cache e sincronização
- **BaseService**: Classe base para services

## Configuração

### Axios

```typescript
// src/services/api/axios.ts
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor: adiciona token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor: trata erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### React Query

```typescript
// src/index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

## Estrutura de Services

### Organização

Cada entidade tem sua pasta em `src/services/`:

```
src/services/
├── api/                      # Configurações base
│   ├── axios.ts             # Cliente Axios
│   └── base.service.ts      # Classe BaseService
│
├── examples/                 # Entidade Example
│   ├── example.service.ts   # CRUD
│   ├── example.hooks.ts     # React Query hooks
│   └── index.ts             # Re-exports
│
└── auth/                     # Autenticação
    ├── auth.service.ts
    ├── auth.hooks.ts
    └── index.ts
```

### BaseService

```typescript
// src/services/api/base.service.ts
export class BaseService {
  protected baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const response = await api.get<T>(`${this.baseURL}${endpoint}`)
    return response.data
  }

  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await api.post<T>(`${this.baseURL}${endpoint}`, data)
    return response.data
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await api.patch<T>(`${this.baseURL}${endpoint}`, data)
    return response.data
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const response = await api.delete<T>(`${this.baseURL}${endpoint}`)
    return response.data
  }
}
```

## Criar Nova Integração

### 1. Types

```typescript
// src/types/medication.ts
export interface Medication {
  id: string
  name: string
  dosage: string
  createdAt: string
}

export interface CreateMedicationDTO {
  name: string
  dosage: string
}

export interface UpdateMedicationDTO {
  name?: string
  dosage?: string
}

export interface MedicationFilters {
  status?: 'active' | 'inactive'
  page?: number
}
```

### 2. Service

```typescript
// src/services/medications/medication.service.ts
import { BaseService } from '../api/base.service'
import type { CreateMedicationDTO, Medication } from '@/types/medication'

class MedicationService extends BaseService {
  constructor() {
    super('/medications')
  }

  async getAll(filters?: MedicationFilters) {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', filters.page.toString())
    
    const query = params.toString()
    return this.get(query ? `/?${query}` : '/')
  }

  async getById(id: string) {
    return this.get(`/${id}`)
  }

  async create(data: CreateMedicationDTO) {
    return this.post('/', data)
  }

  async update(id: string, data: UpdateMedicationDTO) {
    return this.patch(`/${id}`, data)
  }

  async delete(id: string) {
    return this.delete(`/${id}`)
  }
}

export const medicationService = new MedicationService()
```

### 3. Hooks

```typescript
// src/services/medications/medication.hooks.ts
import { medicationService } from './medication.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Query keys
const MEDICATIONS_KEYS = {
  all: ['medications'] as const,
  lists: () => [...MEDICATIONS_KEYS.all, 'list'] as const,
  list: (filters?) => [...MEDICATIONS_KEYS.lists(), filters] as const,
  details: () => [...MEDICATIONS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...MEDICATIONS_KEYS.details(), id] as const,
}

// GET lista
export function useMedications(filters?) {
  return useQuery({
    queryKey: MEDICATIONS_KEYS.list(filters),
    queryFn: () => medicationService.getAll(filters),
  })
}

// GET individual
export function useMedication(id: string) {
  return useQuery({
    queryKey: MEDICATIONS_KEYS.detail(id),
    queryFn: () => medicationService.getById(id),
    enabled: !!id,
  })
}

// POST criar
export function useCreateMedication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateMedicationDTO) => medicationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDICATIONS_KEYS.lists() })
    },
  })
}

// PATCH atualizar
export function useUpdateMedication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => medicationService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: MEDICATIONS_KEYS.detail(id) })
      queryClient.invalidateQueries({ queryKey: MEDICATIONS_KEYS.lists() })
    },
  })
}

// DELETE
export function useDeleteMedication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => medicationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDICATIONS_KEYS.lists() })
    },
  })
}
```

### 4. Index

```typescript
// src/services/medications/index.ts
export * from './medication.service'
export * from './medication.hooks'
```

### 5. Usar na Página

```typescript
// src/pages/Medications/index.tsx
import { useMedications, useCreateMedication } from '@/services/medications'

export const Medications: React.FC = () => {
  const { data, isLoading, error } = useMedications({ page: 1 })
  const createMutation = useCreateMedication()
  
  const handleCreate = async () => {
    await createMutation.mutateAsync({
      name: 'Aspirina',
      dosage: '100mg',
    })
  }
  
  if (isLoading) return <CircularProgress />
  if (error) return <Alert severity="error">Erro ao carregar</Alert>
  
  return (
    <Box>
      <Button onClick={handleCreate}>Criar</Button>
      {data?.items.map((med) => (
        <Card key={med.id}>{med.name}</Card>
      ))}
    </Box>
  )
}
```

## Autenticação

### Auth Service

```typescript
// src/services/auth/auth.service.ts
class AuthService extends BaseService {
  constructor() {
    super('/auth')
  }

  async login(credentials: LoginCredentials) {
    return this.post('/login', credentials)
  }

  async getCurrentUser() {
    return this.get('/me')
  }

  async logout() {
    return this.post('/logout')
  }
}
```

### Auth Store (Zustand)

```typescript
// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        const { user, token } = await authService.login(credentials)
        set({ user, isAuthenticated: true, isLoading: false })
      },

      logout: async () => {
        await authService.logout()
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage', // Persiste no localStorage automaticamente
      partialState: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
```

### Rota Protegida

```typescript
// src/routes/ProtectedRoute.tsx
import { useAuthStore } from '@/stores/authStore'

export const ProtectedRoute: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) return <CircularProgress />
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <>{children}</>
}

// Uso
<Route
  path="/medications"
  element={
    <ProtectedRoute>
      <Medications />
    </ProtectedRoute>
  }
/>
```

## Loading e Erros

```typescript
export const MyPage: React.FC = () => {
  const { data, isLoading, isFetching, isError, error } = useMedications()

  if (isLoading) return <CircularProgress />
  if (isError) return <Alert severity="error">{error.message}</Alert>

  return (
    <Box>
      {isFetching && <LinearProgress />}
      {data && <MedicationsList items={data.items} />}
    </Box>
  )
}
```

## Optimistic Updates

```typescript
export function useUpdateMedication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => medicationService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: KEYS.detail(id) })
      
      // Snapshot anterior
      const previous = queryClient.getQueryData(KEYS.detail(id))
      
      // Atualiza otimisticamente
      queryClient.setQueryData(KEYS.detail(id), (old) => ({
        ...old,
        ...data,
        updatedAt: new Date().toISOString(),
      }))
      
      return { previous }
    },
    onError: (error, { id }, context) => {
      // Rollback em erro
      if (context?.previous) {
        queryClient.setQueryData(KEYS.detail(id), context.previous)
      }
    },
    onSettled: (data, error, { id }) => {
      // Revalida sempre
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) })
    },
  })
}
```

## Boas Práticas

**Services:**
- Uma pasta por entidade em `services/`
- Sempre estender `BaseService`
- Service no singular (`medication.service.ts`)
- Criar `index.ts` para re-exports

**React Query:**
- Query keys hierárquicas e consistentes
- Invalidar cache após mutations
- Optimistic updates para melhor UX
- Error handling adequado

**Autenticação:**
- Token no localStorage (ou cookies httpOnly)
- Interceptors para adicionar token automaticamente
- Redirect 401 para login
- Loading states durante auth

## Convenções

### ✅ Fazer

- Pasta por entidade: `services/medications/`
- Estender `BaseService`
- Hooks separados do service
- Query keys organizadas
- `index.ts` para re-exports

### ❌ Não Fazer

- Misturar entidades em um service
- Services sem `BaseService`
- Hooks direto em `src/hooks/`
- Duplicar lógica HTTP

## Referências

- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest)
- [JWT.io](https://jwt.io/)

