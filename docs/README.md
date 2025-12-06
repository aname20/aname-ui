# Documentação do AnAme UI

Bem-vindo à documentação completa do projeto AnAme UI! Esta pasta contém todos os padrões, convenções e guias de desenvolvimento do projeto.

## 📚 Índice de Documentação

### 1. [Arquitetura e Organização](./architecture.md)
**O que você vai aprender:**
- Estrutura completa de pastas do projeto
- Princípio de colocation (local vs global)
- Gerenciamento de estado (local, global, servidor)
- Convenções de nomenclatura
- Convenções de import

**Quando consultar:** Ao iniciar no projeto ou decidir onde criar novos arquivos.

### 2. [Desenvolvimento Frontend](./development.md)
**O que você vai aprender:**
- Tipos de componentes (Apresentação vs Container)
- Estrutura de componentes simples e complexos
- Formulários com React Hook Form + Yup
- Validações comuns e tratamento de erros
- Estilização com Material-UI (sx prop, styled, tema)
- Responsividade e Grid layout
- Boas práticas

**Quando consultar:** Ao criar componentes, formulários ou estilizar interfaces.

### 3. [API e Integração de Dados](./api.md)
**O que você vai aprender:**
- Configuração do Axios com interceptors
- BaseService e estrutura de services
- Como criar nova integração (types, service, hooks)
- React Query (queries, mutations, cache)
- Autenticação JWT e AuthContext
- Rotas protegidas
- Loading states e error handling
- Optimistic updates

**Quando consultar:** Ao integrar com backend, criar services ou trabalhar com autenticação.

## 🎯 Guias Rápidos

### Decidir Onde Criar Arquivo

1. **Local** (dentro de `pages/` ou `components/`): código usado apenas ali
2. **Global** (em `src/hooks/`, `src/utils/`, etc): código reutilizado em 2+ lugares

Veja: [Arquitetura](./architecture.md) → seção "Colocation"

### Criar um Novo Componente

1. Decida se é local ou global
2. Use PascalCase para nome do arquivo (`Button.tsx`)
3. Sempre tipar props com TypeScript
4. Para componentes complexos, crie pasta com `index.tsx`, `types.ts`, `utils.ts`

Veja: [Development](./development.md) → seção "Componentes"

### Criar um Novo Formulário

1. Crie schema em `src/validation/[entity].schema.ts`
2. Use `yup.InferType` para gerar types
3. Use `Controller` do React Hook Form + Material-UI
4. Mensagens de erro em português, keys em inglês

Veja: [Development](./development.md) → seção "Formulários"

### Integrar com Nova API

1. Crie types em `src/types/[entity].ts`
2. Crie pasta `src/services/[entity]/`
3. Crie `[entity].service.ts` estendendo `BaseService`
4. Crie `[entity].hooks.ts` com hooks do React Query
5. Crie `index.ts` para re-exports

Veja: [API](./api.md) → seção "Criar Nova Integração"

## 📋 Checklist para Novos Desenvolvedores

- [ ] Ler [Arquitetura](./architecture.md) para entender estrutura e convenções
- [ ] Ler [Development](./development.md) para padrões de componentes e forms
- [ ] Ler [API](./api.md) para integração com backend
- [ ] Configurar ambiente de desenvolvimento local
- [ ] Explorar a estrutura de pastas em `src/`

## 🔍 Como Encontrar Informações

### Por Tópico

| Preciso de... | Consultar |
|---------------|-----------|
| Entender estrutura do projeto | [Arquitetura](./architecture.md) |
| Criar componente | [Development](./development.md) → Componentes |
| Criar formulário | [Development](./development.md) → Formulários |
| Estilizar componente | [Development](./development.md) → Estilização |
| Chamar API | [API](./api.md) → Criar Nova Integração |
| Adicionar autenticação | [API](./api.md) → Autenticação |
| Nomear arquivo/variável | [Arquitetura](./architecture.md) → Nomenclatura |

### Por Ferramenta

| Ferramenta | Onde está documentada |
|------------|----------------------|
| React Hook Form | [Development](./development.md) → Formulários |
| Yup | [Development](./development.md) → Formulários |
| Material-UI | [Development](./development.md) → Estilização |
| Axios | [API](./api.md) → Configuração |
| React Query | [API](./api.md) → Estrutura de Services |
| Context API | [API](./api.md) → Autenticação |

## 🆘 Precisa de Ajuda?

1. **Consulte a documentação** relevante primeiro
2. **Procure por exemplos** no código existente (`src/`)
3. **Pergunte ao time** se ainda tiver dúvidas

## 📝 Contribuindo com a Documentação

A documentação deve evoluir com o projeto:

1. Encontrou algo desatualizado? Atualize!
2. Descobriu uma boa prática? Documente!
3. Criou um padrão novo? Compartilhe!

```bash
# 1. Edite o arquivo markdown relevante em docs/
# 2. Commit com mensagem apropriada
git commit -m "docs: atualiza seção de formulários"

# 3. Push e abra PR
git push origin docs/update-forms
```

## 🎓 Recursos Externos

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Material-UI
- [MUI Documentation](https://mui.com/)
- [MUI System](https://mui.com/system/getting-started/)

### Formulários
- [React Hook Form](https://react-hook-form.com/)
- [Yup Documentation](https://github.com/jquense/yup)

### API & Estado
- [Axios Documentation](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest)

### Código
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Última atualização:** Dez 2025  
**Mantida por:** Time AnAme
