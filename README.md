# Cognee - MorehopeQA

Sistema de análise e processamento de perguntas com IA usando Vue.js e Vuetify.

## 📋 Descrição

Este projeto é uma aplicação web desenvolvida em Vue.js 3 com Vuetify para análise e processamento de perguntas usando inteligência artificial. O sistema permite visualizar perguntas, processá-las com diferentes tipos de análise e comparar os resultados através de grafos interativos.

## 🚀 Funcionalidades

- **Dashboard Principal**: Visualização e seleção de perguntas
- **Processamento de Perguntas**: Diferentes tipos de análise com IA
- **Processamento de Texto Livre**: Formulário para inserção livre de contexto e pergunta
- **Visualização de Grafos**: Representação visual dos resultados
- **Comparação de Grafos**: Análise comparativa entre diferentes processamentos
- **Interface Responsiva**: Design adaptável para diferentes dispositivos
- **Navegação por Rotas**: Sistema de navegação organizado com Vue Router
- **Sistema de Notificações**: Feedback visual para ações do usuário

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript reativo
- **Vuetify 3**: Biblioteca de componentes Material Design
- **Vue Router 4**: Sistema de roteamento
- **Vuex 4**: Gerenciamento de estado
- **V-Network-Graph**: Visualização de grafos interativos
- **D3-Force**: Algoritmos de layout para grafos

## 📁 Estrutura do Projeto

```
src/
├── components/                    # Componentes reutilizáveis
│   ├── layout/                   # Componentes de layout
│   │   ├── AppBar.vue           # Barra superior
│   │   ├── NavigationDrawer.vue # Menu lateral
│   │   ├── AppFooter.vue        # Rodapé
│   │   └── NotificationSystem.vue # Sistema de notificações
│   ├── GraphViewer.vue          # Visualizador de grafos
│   ├── GraphMetrics.vue         # Métricas dos grafos
│   ├── CompareGraphs.vue        # Comparação de grafos
│   ├── QuestionDetails.vue      # Detalhes da pergunta
│   ├── ProcessingDashboard.vue  # Dashboard de processamento
│   └── ProcessingFreeTextDashboard.vue # Dashboard de texto livre
├── views/                        # Páginas da aplicação
│   ├── HomeView.vue             # Página inicial
│   ├── DashboardView.vue        # Dashboard principal
│   ├── QuestionDetailsView.vue  # Detalhes da pergunta
│   ├── CompareView.vue          # Comparação de grafos
│   └── FreeTextProcessingView.vue # Processamento de texto livre
├── layouts/                      # Layouts da aplicação
│   └── AppLayout.vue            # Layout principal
├── router/                       # Configuração do Vue Router
│   └── index.js                 # Definição das rotas
├── store/                        # Gerenciamento de estado (Vuex)
│   └── index.js                 # Configuração da store
├── composables/                  # Composables reutilizáveis
│   └── useNotifications.js      # Gerenciamento de notificações
├── config/                       # Configurações da aplicação
│   └── api.js                   # Configurações da API
├── plugins/                      # Plugins do Vue
│   ├── vuetify.js               # Configuração do Vuetify
│   └── webfontloader.js         # Carregamento de fontes
├── assets/                       # Recursos estáticos
├── App.vue                       # Componente raiz
└── main.js                       # Ponto de entrada da aplicação
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd front-vue-morehopeqa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
echo "VUE_APP_API_BASE_URL=http://localhost:5001" > .env
```

4. Execute o servidor de desenvolvimento:
```bash
npm run serve
```

5. Acesse a aplicação em `http://localhost:8080`

### Build para Produção

```bash
npm run build
```

## 📖 Como Usar

### 1. Página Inicial
- Acesse a página inicial para ver um resumo do sistema
- Navegue pelas diferentes seções usando o menu lateral

### 2. Dashboard
- Selecione uma pergunta da tabela
- Visualize os detalhes da pergunta selecionada
- Escolha um tipo de processamento
- Execute o processamento e aguarde os resultados

### 3. Processamento de Texto Livre
- Acesse a página "Texto Livre" no menu
- Insira um contexto personalizado
- Digite sua pergunta
- Escolha o tipo de processamento
- Execute e visualize os resultados

### 4. Comparação de Grafos
- Processe duas perguntas diferentes
- Compare os grafos gerados
- Analise as diferenças e semelhanças

## 🔧 Configuração

### Variáveis de Ambiente

- `VUE_APP_API_BASE_URL`: URL base da API do servidor (padrão: http://localhost:5001)
- `VUE_APP_TITLE`: Título da aplicação
- `VUE_APP_VERSION`: Versão da aplicação

### API do Servidor

O projeto espera que um servidor backend esteja rodando na URL configurada em `VUE_APP_API_BASE_URL`. O servidor deve fornecer os seguintes endpoints:

- `POST /runquestion`: Iniciar processamento de pergunta
- `GET /status/:taskId`: Verificar status de uma tarefa
- `POST /runcomparison`: Iniciar comparação de grafos
- `GET /getcomparison/:comparisonId`: Obter resultado de comparação

## 🎨 Personalização

### Temas
O projeto usa Vuetify 3 com tema personalizável. Para alterar o tema, modifique o arquivo `src/plugins/vuetify.js`.

### Componentes
Todos os componentes estão organizados de forma modular e podem ser facilmente personalizados ou reutilizados.

## 📝 Scripts Disponíveis

- `npm run serve`: Executa o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run lint`: Executa o linter para verificar código
- `npm run lint:fix`: Executa o linter e corrige automaticamente
- `npm run test:unit`: Executa testes unitários
- `npm run format`: Formata o código com Prettier
- `npm run docker:dev`: Executa em container Docker para desenvolvimento
- `npm run docker:prod`: Executa em container Docker para produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos canais oficiais do projeto.

---

**Desenvolvido com ❤️ usando Vue.js e Vuetify**
