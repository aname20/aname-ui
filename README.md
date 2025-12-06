# AnAme UI

Aplicação web para gerenciamento de medicamentos de dependentes, desenvolvida com React, TypeScript e Material-UI.

## 📋 Sobre o Projeto

O **AnAme** é uma aplicação mobile-first que ajuda cuidadores a gerenciar medicamentos e horários de seus dependentes, garantindo administração correta e no tempo adequado.

## 🚀 Tecnologias

### Core
- **React 19** - Biblioteca UI
- **TypeScript 5.9** - Tipagem estática
- **Vite 7** - Build tool e dev server
- **React Router 7** - Roteamento

### UI/Styling
- **Material-UI v7** - Componentes e design system
- **Emotion** - CSS-in-JS
- **styled-components** - Componentes estilizados

### Formulários e Validação
- **React Hook Form 7** - Gerenciamento de formulários
- **Yup 1.7** - Validação de schemas

### HTTP e Estado
- **Axios 1.13** - Cliente HTTP
- **React Query 5** - Gerenciamento de estado do servidor
- **Zustand 5** - Estado global (auth, configurações)

### Utilitários
- **date-fns 4** - Manipulação de datas

### Code Quality
- **ESLint 9** - Linting
- **Prettier 3** - Formatação
- **Husky 9** - Git hooks
- **Commitlint** - Conventional commits

## 📁 Estrutura do Projeto

```
aname-ui/
├── docs/                    # 📚 Documentação completa
│   ├── architecture.md      # Arquitetura e estrutura
│   ├── components.md        # Padrões de componentes
│   ├── forms.md            # Formulários e validação
│   ├── api-integration.md  # Integração com API
│   ├── authentication.md   # Autenticação e autorização
│   ├── naming-conventions.md # Nomenclatura
│   └── styling.md          # Estilos e tema
├── src/
│   ├── assets/             # Imagens, ícones, fontes
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/        # Componentes genéricos
│   │   ├── forms/         # Componentes de formulário
│   │   └── layouts/       # Layouts
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas da aplicação
│   ├── routes/            # Configuração de rotas
│   ├── services/          # Serviços de API
│   │   └── api/          # Axios e services
│   ├── stores/            # Zustand stores
│   ├── types/             # TypeScript types
│   ├── utils/             # Funções utilitárias
│   ├── validation/        # Schemas Yup
│   ├── constants/         # Constantes
│   ├── theme.ts           # Tema MUI
│   └── index.tsx          # Entry point
├── public/                # Arquivos estáticos
└── package.json

```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clonar repositório
git clone <repository-url>
cd aname-ui

# Instalar dependências
pnpm install

# Copiar variáveis de ambiente (criar .env.local baseado em .env.example)
# VITE_API_BASE_URL=http://localhost:3000/api

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Scripts Disponíveis

```bash
pnpm dev      # Inicia servidor de desenvolvimento (http://localhost:5173)
pnpm build    # Build de produção
pnpm preview  # Preview do build de produção
pnpm lint     # Executa ESLint
```

## 📖 Documentação

Toda a documentação do projeto está organizada na pasta `docs/`:

### 🏗️ [Arquitetura](docs/architecture.md)
- Estrutura de pastas e arquivos
- Camadas da aplicação
- Fluxo de dados
- Decisões arquiteturais

### 🧩 [Componentes](docs/components.md)
- Tipos de componentes (Presentational, Container, Compound)
- Estrutura e organização
- Boas práticas
- Exemplos práticos

### 📝 [Formulários](docs/forms.md)
- React Hook Form + Yup + MUI
- Padrões de validação
- Componentes reutilizáveis
- Tratamento de erros

### 🌐 [Integração com API](docs/api-integration.md)
- Configuração Axios
- Services e BaseService
- React Query
- Loading states e paginação

### 🔐 [Autenticação](docs/authentication.md)
- Fluxo de autenticação JWT
- Auth Store (Zustand) e hooks
- Rotas protegidas
- Refresh tokens

### 📏 [Convenções de Nomenclatura](docs/naming-conventions.md)
- Arquivos e pastas
- Variáveis e funções
- Componentes e hooks
- Git (branches e commits)

### 🎨 [Estilos](docs/styling.md)
- Material-UI e tema
- Prop `sx` vs styled-components
- Responsividade e breakpoints
- Boas práticas

## 🎯 Padrões e Convenções

### Arquivos
- Componentes: `PascalCase.tsx` (ex: `Button.tsx`)
- Hooks: `camelCase.ts` (ex: `useAuth.ts`)
- Stores: `camelCase.ts` (ex: `authStore.ts`)
- Utils: `camelCase.ts` (ex: `formatDate.ts`)

### Código
- Componentes: `PascalCase`
- Funções: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Interfaces/Types: `PascalCase`

### Git
- Branches: `tipo/descricao-kebab-case`
  - `feature/user-authentication`
  - `fix/form-validation`
  - `docs/update-readme`
- Commits: Conventional Commits
  - `feat: add user authentication`
  - `fix: resolve form validation issue`
  - `docs: update API documentation`

## 🏃 Como Começar a Desenvolver

1. **Leia a documentação** em `docs/` para entender os padrões do projeto
2. **Crie uma branch** seguindo a convenção: `feature/nome-da-feature`
3. **Desenvolva** seguindo os padrões estabelecidos
4. **Teste** sua implementação
5. **Commit** seguindo Conventional Commits
6. **Push** e abra um Pull Request

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Time

Desenvolvido com ❤️ pela equipe AnAme

---

**Nota**: Esta aplicação está em desenvolvimento ativo. Consulte a documentação em `docs/` para informações detalhadas sobre padrões e práticas do projeto.