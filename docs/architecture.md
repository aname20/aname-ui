# Arquitetura e Organização

## Visão Geral

O **aname-ui** é uma aplicação React para gerenciamento de medicamentos, usando TypeScript, Material-UI e Vite.

## Estrutura de Pastas

```
src/
├── assets/          # Imagens, ícones
├── components/      # Componentes reutilizáveis
│   ├── common/      # Componentes genéricos
│   │   └── Button/
│   │       ├── index.tsx
│   │       ├── types.ts      # Types locais (opcional)
│   │       └── utils.ts      # Utils locais (opcional)
│   ├── forms/       # Componentes de formulário
│   └── layouts/     # Layouts
├── pages/           # Páginas da aplicação
│   └── Medications/
│       ├── index.tsx
│       ├── components/       # Componentes locais (opcional)
│       ├── hooks/            # Hooks locais (opcional)
│       ├── utils/            # Utils locais (opcional)
│       ├── types.ts          # Types locais (opcional)
│       └── pages/            # Sub-páginas do módulo (opcional)
│           ├── MedicationList/
│           │   └── index.tsx
│           ├── MedicationDetail/
│           │   └── index.tsx
│           └── MedicationCreate/
│               └── index.tsx
├── routes/          # Configuração de rotas
├── services/        # Serviços de API (uma pasta por entidade)
│   ├── api/         # Configurações base (axios, BaseService)
│   ├── auth/        # Service + hooks de auth
│   └── examples/    # Service + hooks de examples
├── stores/          # Zustand stores (gerenciamento de estado)
├── types/           # TypeScript types globais
├── utils/           # Funções utilitárias globais
├── validation/      # Schemas Yup (*.schema.ts)
├── constants/       # Constantes
└── theme.ts         # Tema MUI
```

## Princípio: Colocation

**Mantenha código relacionado próximo.** Se algo é usado apenas em um lugar, mantenha-o lá.

### Local vs Global

**Use LOCALMENTE** (dentro de pages/ ou components/) quando:
- Código usado apenas naquela página/componente
- Lógica muito específica
- Sem reuso planejado

**Use GLOBALMENTE** (src/hooks/, src/utils/, etc) quando:
- Código reutilizado em 2+ lugares
- Funcionalidade genérica
- Útil para futuras features

### Exemplo

```
✅ Bom - Local:
pages/Medications/
  └── utils/calculateNextDose.ts    # Só Medications usa

✅ Bom - Global:
src/utils/formatDate.ts             # Várias páginas usam

❌ Ruim - Global desnecessário:
src/utils/calculateNextDose.ts      # Só Medications usa!
```

## Gerenciamento de Estado

- **Local**: `useState` para componentes
- **Global**: Zustand para auth e estado global
- **Servidor**: React Query para dados da API
- **Formulários**: React Hook Form

## Nomenclatura

### Arquivos

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `Button.tsx`, `MedicationCard.tsx` |
| Hooks | camelCase | `useAuth.ts`, `useMedications.ts` |
| Utils | camelCase | `formatDate.ts`, `calculateDose.ts` |
| Services | camelCase | `auth.service.ts`, `example.service.ts` |
| Schemas | entity.schema.ts | `user.schema.ts`, `login.schema.ts` |
| Types | camelCase | `types.ts`, `auth.ts` |

### Código

| Item | Convenção | Exemplo |
|------|-----------|---------|
| Variáveis | camelCase | `userName`, `isLoading` |
| Constantes | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Funções | camelCase | `getUserById`, `formatDate` |
| Event Handlers | handle + name | `handleClick`, `handleSubmit` |
| Props Callbacks | on + name | `onClick`, `onSubmit` |
| Componentes | PascalCase | `Button`, `MedicationCard` |
| Hooks | use + name | `useAuth`, `useMedications` |
| Interfaces/Types | PascalCase | `User`, `ButtonProps` |
| Classes | PascalCase | `UserService`, `ApiClient` |

### Git

```
Branches:  feature/user-authentication
           fix/form-validation
           docs/update-readme

Commits:   feat: add user authentication
           fix: resolve form validation
           docs: update API documentation
```

### Booleanos

Use prefixos descritivos:

```typescript
✅ Bom:
const isLoading = true
const hasError = false
const canEdit = true

❌ Ruim:
const loading = true    // Não é claro
const error = false     // Parece objeto
```

## Convenções de Import

```typescript
// 1. Bibliotecas externas
import React from 'react'
import { Box } from '@mui/material'

// 2. Internos globais
import { useAuthStore } from '@/stores/authStore'
import { exampleService } from '@/services/examples'

// 3. Componentes globais
import { Button } from '@/components/common/Button'

// 4. Types globais
import type { User } from '@/types/auth'

// 5. Locais (relativos)
import { MedicationCard } from './components/MedicationCard'
import type { FilterOptions } from './types'
```
