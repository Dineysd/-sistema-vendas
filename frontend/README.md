# Frontend do Sistema de Gerenciamento de Vendas

Interface web do sistema de gerenciamento de vendas desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- NPM 8.x ou superior
- Backend da aplicação rodando (ver instruções no README.md do backend)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd [nome-do-repositorio]/frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Rodando o projeto

### Ambiente de desenvolvimento

```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`

### Build de produção

```bash
npm run build
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout/         # Componentes de layout (Navbar, Sidebar)
│   │   └── PageContainer/  # Container padrão para páginas
│   ├── pages/              # Páginas da aplicação
│   │   └── Products/       # Funcionalidades relacionadas a produtos
│   ├── services/           # Serviços de comunicação com API
│   ├── types/              # Definições de tipos TypeScript
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Ponto de entrada da aplicação
├── .env.example           # Exemplo de variáveis de ambiente
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── vite.config.ts         # Configuração do Vite
```

## 🔄 Fluxo de Desenvolvimento

1. **Branches**
   - `main`: branch principal, contém código em produção
   - `develop`: branch de desenvolvimento
   - `feature/*`: branches para novas funcionalidades
   - `bugfix/*`: branches para correções de bugs

2. **Commits**
   Seguimos o padrão Conventional Commits:
   - `feat`: nova funcionalidade
   - `fix`: correção de bug
   - `docs`: alteração em documentação
   - `style`: formatação, ponto e vírgula, etc
   - `refactor`: refatoração de código
   - `test`: adição ou alteração de testes
   - `chore`: alteração em arquivos de build, etc

## 📚 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Visualiza build de produção localmente
- `npm run lint`: Executa verificação de lint
- `npm run test`: Executa testes unitários

## 🔒 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| VITE_API_URL | URL base da API | http://localhost:5000/api |

## 📱 Features Principais

- [x] Gerenciamento de produtos
  - [x] Listagem com paginação
  - [x] Cadastro
  - [x] Edição
  - [x] Exclusão
  - [x] Importação em massa
- [ ] Gerenciamento de clientes
- [ ] Controle de vendas
- [ ] Relatórios

## 🤝 Contribuindo

1. Crie uma feature branch (`git checkout -b feature/nome-da-feature`)
2. Commit suas alterações (`git commit -am 'feat: adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nome-da-feature`)
4. Crie um Pull Request

## ⚠️ Troubleshooting

### Problemas comuns

1. **API não responde:**
   - Verifique se o backend está rodando
   - Confira se a URL da API está correta no .env
   - Verifique se as portas não estão bloqueadas

2. **Erro de CORS:**
   - Verifique a configuração de CORS no backend
   - Confira se está usando a URL correta da API

3. **Erro de build:**
   - Limpe a pasta node_modules e package-lock.json
   - Execute `npm install` novamente
   - Verifique se todas as dependências estão instaladas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.