# Template Completo para Projetos Vue.js

Este é um template completo para criar novos projetos Vue.js com Vue Router, Vuetify, MDI e v-network-graph, baseado na estrutura didática e organizada que desenvolvemos.

## 🚀 Inicialização Rápida

### 1. Criar o Projeto
```bash
# Criar novo projeto Vue
vue create meu-projeto-vue
cd meu-projeto-vue

# Instalar dependências adicionais
npm install vue-router@4 vuetify@3 @mdi/font v-network-graph @fortawesome/fontawesome-free d3-force roboto-fontface webfontloader

# Instalar dependências de desenvolvimento
npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier vue-cli-plugin-vuetify webpack-plugin-vuetify
```

### 2. Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout
│   │   ├── AppBar.vue
│   │   ├── NavigationDrawer.vue
│   │   ├── AppFooter.vue
│   │   └── NotificationSystem.vue
│   ├── ProcessingDashboard.vue
│   ├── ProcessingFreeTextDashboard.vue
│   ├── QuestionDetails.vue
│   ├── CompareGraphs.vue
│   ├── GraphViewer.vue
│   ├── GraphMetrics.vue
│   └── [outros componentes]
├── views/              # Páginas da aplicação
│   ├── HomeView.vue
│   ├── DashboardView.vue
│   ├── FreeTextProcessingView.vue
│   ├── QuestionDetailsView.vue
│   ├── CompareView.vue
│   └── [outras views]
├── layouts/            # Layouts da aplicação
│   └── AppLayout.vue
├── router/             # Configuração do Vue Router
│   └── index.js
├── store/              # Gerenciamento de estado (Vuex)
│   └── index.js
├── composables/        # Composables reutilizáveis
│   └── useNotifications.js
├── config/             # Configurações da aplicação
│   └── api.js
├── plugins/            # Plugins do Vue
│   ├── vuetify.js
│   └── webfontloader.js
├── assets/             # Recursos estáticos
├── App.vue             # Componente raiz
└── main.js             # Ponto de entrada
```

## 📁 Arquivos do Template

### 1. package.json
```json
{
  "name": "vue-project-template",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "lint:fix": "vue-cli-service lint --fix",
    "test:unit": "vue-cli-service test:unit",
    "test:unit:watch": "vue-cli-service test:unit --watch",
    "test:unit:coverage": "vue-cli-service test:unit --coverage",
    "test:e2e": "vue-cli-service test:e2e",
    "test:e2e:headless": "vue-cli-service test:e2e --headless",
    "format": "prettier --write \"src/**/*.{js,vue,ts,json,css,scss,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,vue,ts,json,css,scss,md}\"",
    "prepare": "husky install",
    "commit": "git-cz",
    "release": "standard-version",
    "docker:build": "docker build -t meu-projeto-vue .",
    "docker:run": "docker run -p 8080:80 meu-projeto-vue",
    "docker:dev": "docker-compose up frontend-dev",
    "docker:prod": "docker-compose up frontend",
    "analyze": "vue-cli-service build --report",
    "preview": "vue-cli-service build && vue-cli-service preview"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.1.0",
    "@mdi/font": "^5.9.55",
    "core-js": "^3.8.3",
    "d3-force": "^3.0.0",
    "roboto-fontface": "*",
    "v-network-graph": "^0.9.21",
    "vue": "^3.2.13",
    "vue-router": "^4.0.0",
    "vuetify": "^3.0.0-beta.0",
    "vuex": "^4.0.0",
    "webfontloader": "^1.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-unit-jest": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/test-utils": "^2.0.0",
    "@vue/vue3-jest": "^29.0.0",
    "babel-jest": "^29.0.0",
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.0.3",
    "husky": "^8.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "jest-transform-stub": "^2.0.0",
    "prettier": "^2.4.1",
    "standard-version": "^9.5.0",
    "vue-cli-plugin-vuetify": "~2.5.8",
    "webpack-plugin-vuetify": "^3.1.2"
  }
}
```

### 2. src/main.js
```javascript
// Arquivo principal da aplicação Vue
// Este arquivo configura e inicializa a aplicação

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

// Importar biblioteca de visualização de grafos
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

// Carregar fontes
loadFonts();

// Criar e configurar a aplicação Vue
const app = createApp(App);

// Registrar plugins e bibliotecas
app.use(store);        // Vuex para gerenciamento de estado
app.use(router);       // Vue Router para navegação
app.use(VNetworkGraph); // Biblioteca para visualização de grafos
app.use(vuetify);      // Vuetify para componentes de UI

// Montar a aplicação no elemento #app
app.mount("#app");
```

### 3. src/App.vue
```vue
<!-- Componente raiz da aplicação -->
<!-- Este componente define a estrutura principal e usa o Vue Router -->

<template>
  <!-- Layout principal da aplicação -->
  <AppLayout />
</template>

<script>
// Importar o layout principal da aplicação
import AppLayout from "./layouts/AppLayout.vue";

export default {
  name: "App",

  // Registrar o componente de layout
  components: {
    AppLayout,
  },
};
</script>

<!-- Estilos globais da aplicação -->
<style>
/* Estilos globais podem ser adicionados aqui se necessário */
</style>
```

### 4. src/router/index.js
```javascript
// Configuração do Vue Router
// Este arquivo define todas as rotas da aplicação

import { createRouter, createWebHistory } from "vue-router";

// Importar as views (páginas) da aplicação
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import FreeTextProcessingView from "../views/FreeTextProcessingView.vue";
import QuestionDetailsView from "../views/QuestionDetailsView.vue";
import CompareView from "../views/CompareView.vue";
import AboutView from "../views/AboutView.vue";

// Definir as rotas da aplicação
const routes = [
  {
    // Rota principal - página inicial
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Início - Meu Projeto Vue",
    },
  },
  {
    // Rota do dashboard principal
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard - Meu Projeto Vue",
    },
  },
  {
    // Rota para processamento de texto livre
    path: "/free-text",
    name: "free-text",
    component: FreeTextProcessingView,
    meta: {
      title: "Processamento de Texto Livre - Meu Projeto Vue",
    },
  },
  {
    // Rota para detalhes de pergunta
    path: "/question/:id",
    name: "question-details",
    component: QuestionDetailsView,
    props: true,
    meta: {
      title: "Detalhes da Pergunta - Meu Projeto Vue",
    },
  },
  {
    // Rota para comparação de grafos
    path: "/compare",
    name: "compare",
    component: CompareView,
    meta: {
      title: "Comparação de Grafos - Meu Projeto Vue",
    },
  },
  {
    // Rota sobre o projeto
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      title: "Sobre - Meu Projeto Vue",
    },
  },
  {
    // Rota de redirecionamento - se alguém acessar uma rota inexistente
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// Criar a instância do router
const router = createRouter({
  // Usar o modo de histórico do navegador
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Interceptar mudanças de rota para atualizar o título da página
router.beforeEach((to, from, next) => {
  // Atualizar o título da página baseado na rota
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
```

### 5. src/layouts/AppLayout.vue
```vue
<!-- Layout principal da aplicação -->
<!-- Este componente define a estrutura base que será usada em todas as páginas -->

<template>
  <v-app>
    <!-- Barra de navegação superior -->
    <AppBar @toggle-drawer="toggleDrawer" />

    <!-- Menu lateral de navegação -->
    <NavigationDrawer v-model="drawer" />

    <!-- Conteúdo principal da aplicação -->
    <v-main>
      <!-- Aqui será renderizado o conteúdo de cada página -->
      <router-view />
    </v-main>

    <!-- Rodapé da aplicação -->
    <AppFooter />

    <!-- Sistema de notificações (snackbars) -->
    <NotificationSystem />
  </v-app>
</template>

<script>
// Importar os componentes de layout
import AppBar from "../components/layout/AppBar.vue";
import NavigationDrawer from "../components/layout/NavigationDrawer.vue";
import AppFooter from "../components/layout/AppFooter.vue";
import NotificationSystem from "../components/layout/NotificationSystem.vue";

export default {
  name: "AppLayout",

  // Registrar os componentes de layout
  components: {
    AppBar,
    NavigationDrawer,
    AppFooter,
    NotificationSystem,
  },

  data() {
    return {
      // Controla se o menu lateral está aberto ou fechado
      drawer: false,
    };
  },

  methods: {
    // Método para alternar o menu lateral
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do layout principal */
.v-main {
  min-height: 100vh;
}
</style>
```

### 6. src/components/layout/AppBar.vue
```vue
<!-- Barra de navegação superior da aplicação -->
<!-- Este componente fica sempre visível no topo da página -->

<template>
  <v-app-bar :elevation="10" color="primary" dark>
    <!-- Botão do menu hambúrguer (apenas em telas pequenas) -->
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="d-md-none" />

    <!-- Logo e título da aplicação -->
    <v-app-bar-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-vuejs</v-icon>
      Meu Projeto Vue
    </v-app-bar-title>

    <!-- Espaçador para empurrar os botões para a direita -->
    <v-spacer />

    <!-- Botões de ação na barra superior -->
    <v-btn icon="mdi-magnify" @click="toggleSearch" title="Pesquisar" />

    <v-btn icon="mdi-cog" @click="openSettings" title="Configurações" />

    <v-btn icon="mdi-help-circle" @click="openHelp" title="Ajuda" />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",

  emits: ["toggle-drawer"],

  methods: {
    // Método para alternar a busca
    toggleSearch() {
      // TODO: Implementar funcionalidade de busca
      console.log("Abrir/fechar busca");
    },

    // Método para abrir configurações
    openSettings() {
      // TODO: Implementar página de configurações
      console.log("Abrir configurações");
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da barra de navegação */
.v-app-bar-title {
  font-weight: 600;
}
</style>
```

### 7. src/components/layout/NavigationDrawer.vue
```vue
<!-- Menu lateral de navegação -->
<!-- Este componente contém os links para as diferentes páginas da aplicação -->

<template>
  <v-navigation-drawer
    v-model="isOpen"
    temporary
    location="left"
    color="grey-lighten-5"
  >
    <!-- Cabeçalho do menu lateral -->
    <v-list-item class="pa-4">
      <v-list-item-title class="text-h6 font-weight-bold">
        Navegação
      </v-list-item-title>
    </v-list-item>

    <v-divider />

    <!-- Lista de itens do menu -->
    <v-list density="compact" nav>
      <!-- Item: Página Inicial -->
      <v-list-item
        prepend-icon="mdi-home"
        title="Página Inicial"
        value="home"
        :to="{ name: 'home' }"
        @click="closeDrawer"
      />

      <!-- Item: Dashboard -->
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        :to="{ name: 'dashboard' }"
        @click="closeDrawer"
      />

      <!-- Item: Sobre -->
      <v-list-item
        prepend-icon="mdi-information"
        title="Sobre"
        value="about"
        :to="{ name: 'about' }"
        @click="closeDrawer"
      />

      <v-divider class="my-2" />

      <!-- Seção de informações -->
      <v-list-item class="pa-2">
        <v-list-item-title class="text-caption text-grey">
          Informações
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-help"
        title="Ajuda"
        value="help"
        @click="openHelp"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",

  props: {
    // Prop para controlar se o menu está aberto
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  computed: {
    // Computed para sincronizar com o v-model
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    // Método para fechar o menu lateral
    closeDrawer() {
      this.isOpen = false;
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
      this.closeDrawer();
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do menu lateral */
.v-list-item {
  border-radius: 8px;
  margin: 2px 8px;
}

.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>
```

### 8. src/components/layout/AppFooter.vue
```vue
<!-- Rodapé da aplicação -->
<!-- Este componente fica sempre visível na parte inferior da página -->

<template>
  <v-footer app color="blue-grey-darken-4" dark class="pa-4">
    <v-container>
      <v-row align="center">
        <!-- Informações de copyright -->
        <v-col cols="12" md="6" class="text-center text-md-left">
          <span class="text-body-2">
            &copy; {{ currentYear }} Meu Projeto Vue
          </span>
        </v-col>

        <!-- Links úteis -->
        <v-col cols="12" md="6" class="text-center text-md-right">
          <v-btn
            variant="text"
            size="small"
            color="white"
            @click="openAbout"
            class="mr-2"
          >
            Sobre
          </v-btn>

          <v-btn
            variant="text"
            size="small"
            color="white"
            @click="openHelp"
            class="mr-2"
          >
            Ajuda
          </v-btn>

          <v-btn variant="text" size="small" color="white" @click="openContact">
            Contato
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",

  computed: {
    // Computed para obter o ano atual
    currentYear() {
      return new Date().getFullYear();
    },
  },

  methods: {
    // Método para abrir informações sobre o projeto
    openAbout() {
      // TODO: Implementar modal ou página sobre o projeto
      console.log("Abrir informações sobre o projeto");
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
    },

    // Método para abrir informações de contato
    openContact() {
      // TODO: Implementar página de contato
      console.log("Abrir informações de contato");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do rodapé */
.v-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
```

### 9. src/components/layout/NotificationSystem.vue
```vue
<!-- Sistema de notificações da aplicação -->
<!-- Este componente gerencia todas as notificações (snackbars) da aplicação -->

<template>
  <div>
    <!-- Snackbar principal para notificações gerais -->
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      location="bottom"
      :multi-line="snackbar.multiLine"
    >
      <div class="d-flex align-center">
        <!-- Ícone da notificação -->
        <v-icon v-if="snackbar.icon" class="mr-2">
          {{ snackbar.icon }}
        </v-icon>

        <!-- Mensagem da notificação -->
        <span>{{ snackbar.message }}</span>

        <!-- Botão de fechar -->
        <v-spacer />
        <v-btn icon size="small" @click="closeSnackbar">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-snackbar>

    <!-- Snackbar para notificações de processamento -->
    <v-snackbar
      v-model="processingSnackbar.visible"
      color="info"
      location="bottom"
      :timeout="-1"
    >
      <div class="d-flex align-center">
        <v-progress-circular
          indeterminate
          color="white"
          size="20"
          class="mr-3"
        />
        <span
          >{{ processingSnackbar.message }} ({{
            processingSnackbar.elapsed
          }}s)</span
        >
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "NotificationSystem",

  data() {
    return {
      // Configuração do snackbar principal
      snackbar: {
        visible: false,
        message: "",
        color: "info",
        timeout: 3000,
        icon: null,
        multiLine: false,
      },

      // Configuração do snackbar de processamento
      processingSnackbar: {
        visible: false,
        message: "Processando...",
        elapsed: 0,
      },

      // Timer para contagem de tempo de processamento
      processingTimer: null,
    };
  },

  methods: {
    // Método para mostrar uma notificação
    showNotification(message, color = "info", options = {}) {
      this.snackbar = {
        visible: true,
        message,
        color,
        timeout: options.timeout || 3000,
        icon: options.icon || null,
        multiLine: options.multiLine || false,
      };
    },

    // Método para fechar a notificação
    closeSnackbar() {
      this.snackbar.visible = false;
    },

    // Método para mostrar notificação de processamento
    showProcessingNotification(message = "Processando...") {
      this.processingSnackbar = {
        visible: true,
        message,
        elapsed: 0,
      };

      // Iniciar timer para contagem de tempo
      this.processingTimer = setInterval(() => {
        this.processingSnackbar.elapsed++;
      }, 1000);
    },

    // Método para esconder notificação de processamento
    hideProcessingNotification() {
      this.processingSnackbar.visible = false;

      // Limpar timer
      if (this.processingTimer) {
        clearInterval(this.processingTimer);
        this.processingTimer = null;
      }
    },

    // Método para mostrar notificação de sucesso
    showSuccess(message) {
      this.showNotification(message, "success", {
        icon: "mdi-check-circle",
      });
    },

    // Método para mostrar notificação de erro
    showError(message) {
      this.showNotification(message, "error", {
        icon: "mdi-alert-circle",
        timeout: 5000,
      });
    },

    // Método para mostrar notificação de aviso
    showWarning(message) {
      this.showNotification(message, "warning", {
        icon: "mdi-alert",
      });
    },

    // Método para mostrar notificação de informação
    showInfo(message) {
      this.showNotification(message, "info", {
        icon: "mdi-information",
      });
    },
  },

  // Limpar timer quando o componente for destruído
  beforeUnmount() {
    if (this.processingTimer) {
      clearInterval(this.processingTimer);
    }
  },
};
</script>

<style scoped>
/* Estilos específicos do sistema de notificações */
.v-snackbar {
  z-index: 9999;
}
</style>
```

### 10. src/views/HomeView.vue
```vue
<!-- Página inicial da aplicação -->
<!-- Esta é a primeira página que o usuário vê ao acessar a aplicação -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold text-primary mb-4">
          <v-icon size="large" class="mr-3">mdi-vuejs</v-icon>
          Meu Projeto Vue
        </h1>
        <p class="text-h6 text-grey-darken-1">
          Aplicação Vue.js com Vuetify, Vue Router e v-network-graph
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Cards de funcionalidades principais -->
    <v-row>
      <!-- Card: Dashboard -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="navigateToDashboard"
        >
          <v-icon size="64" color="primary" class="mb-4">
            mdi-view-dashboard
          </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Dashboard</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Acesse o painel principal da aplicação
          </p>
          <v-btn
            color="primary"
            variant="outlined"
            @click="navigateToDashboard"
          >
            Acessar Dashboard
          </v-btn>
        </v-card>
      </v-col>

      <!-- Card: Sobre -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="navigateToAbout"
        >
          <v-icon size="64" color="secondary" class="mb-4">
            mdi-information
          </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Sobre</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Conheça mais sobre este projeto
          </p>
          <v-btn
            color="secondary"
            variant="outlined"
            @click="navigateToAbout"
          >
            Saiba Mais
          </v-btn>
        </v-card>
      </v-col>

      <!-- Card: Documentação -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="openDocumentation"
        >
          <v-icon size="64" color="success" class="mb-4">
            mdi-book-open
          </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Documentação</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Acesse a documentação do projeto
          </p>
          <v-btn color="success" variant="outlined" @click="openDocumentation">
            Ver Docs
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seção de tecnologias utilizadas -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="1">
          <h3 class="text-h5 font-weight-bold mb-4 text-center">
            Tecnologias Utilizadas
          </h3>
          <v-row>
            <v-col cols="12" sm="3" class="text-center">
              <v-icon size="48" color="green" class="mb-2">mdi-vuejs</v-icon>
              <div class="text-h6 font-weight-bold">Vue.js 3</div>
              <div class="text-body-2 text-grey-darken-1">
                Framework JavaScript
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <v-icon size="48" color="blue" class="mb-2">mdi-material-design</v-icon>
              <div class="text-h6 font-weight-bold">Vuetify 3</div>
              <div class="text-body-2 text-grey-darken-1">
                Componentes Material Design
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <v-icon size="48" color="purple" class="mb-2">mdi-routes</v-icon>
              <div class="text-h6 font-weight-bold">Vue Router</div>
              <div class="text-body-2 text-grey-darken-1">
                Roteamento SPA
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <v-icon size="48" color="orange" class="mb-2">mdi-graph</v-icon>
              <div class="text-h6 font-weight-bold">v-network-graph</div>
              <div class="text-body-2 text-grey-darken-1">
                Visualização de Grafos
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  methods: {
    // Método para navegar para o dashboard
    navigateToDashboard() {
      this.$router.push({ name: "dashboard" });
    },

    // Método para navegar para a página sobre
    navigateToAbout() {
      this.$router.push({ name: "about" });
    },

    // Método para abrir documentação
    openDocumentation() {
      // TODO: Implementar link para documentação
      console.log("Abrir documentação");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da página inicial */
.h-100 {
  height: 100%;
}

.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
```

### 11. src/views/DashboardView.vue
```vue
<!-- Página do Dashboard principal -->
<!-- Esta página contém a funcionalidade principal da aplicação -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-view-dashboard</v-icon>
          Dashboard
        </h1>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Conteúdo do dashboard -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Estatísticas
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="text-center">
                <div class="text-h4 font-weight-bold text-primary">150</div>
                <div class="text-body-2 text-grey-darken-1">Total de Itens</div>
              </v-col>
              <v-col cols="6" class="text-center">
                <div class="text-h4 font-weight-bold text-success">89</div>
                <div class="text-body-2 text-grey-darken-1">Processados</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-cog</v-icon>
            Ações Rápidas
          </v-card-title>
          <v-card-text>
            <v-btn color="primary" class="mr-2 mb-2">
              <v-icon class="mr-2">mdi-plus</v-icon>
              Adicionar Item
            </v-btn>
            <v-btn color="secondary" class="mr-2 mb-2">
              <v-icon class="mr-2">mdi-upload</v-icon>
              Importar
            </v-btn>
            <v-btn color="success" class="mb-2">
              <v-icon class="mr-2">mdi-download</v-icon>
              Exportar
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seção de visualização de grafo -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-graph</v-icon>
            Visualização de Grafo
          </v-card-title>
          <v-card-text>
            <div class="text-center pa-8">
              <v-icon size="64" color="grey" class="mb-4">
                mdi-graph-outline
              </v-icon>
              <p class="text-h6 text-grey-darken-1">
                Área para visualização de grafos com v-network-graph
              </p>
              <v-btn color="primary" class="mt-4">
                <v-icon class="mr-2">mdi-play</v-icon>
                Gerar Grafo
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardView",

  data() {
    return {
      // Dados do dashboard
      stats: {
        totalItems: 150,
        processedItems: 89,
      },
    };
  },

  methods: {
    // Métodos do dashboard podem ser adicionados aqui
  },
};
</script>

<style scoped>
/* Estilos específicos do dashboard */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 12. src/components/ProcessingFreeTextDashboard.vue
```vue
<!-- Componente de processamento de texto livre -->
<!-- Este componente permite processar perguntas e contexto inseridos pelo usuário -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-text-box-plus</v-icon>
          Processamento de Texto Livre
        </h1>
        <p class="text-h6 text-grey-darken-1 text-center mt-2">
          Insira sua pergunta e contexto para processamento com IA
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Formulário de entrada -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-form-textbox</v-icon>
            Dados para Processamento
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <!-- Campo de pergunta -->
              <v-textarea
                v-model="formData.question"
                label="Pergunta"
                placeholder="Digite sua pergunta aqui..."
                variant="outlined"
                rows="3"
                :rules="questionRules"
                required
                class="mb-4"
                hint="Descreva a pergunta que você quer processar"
                persistent-hint
              />

              <!-- Campo de contexto -->
              <v-textarea
                v-model="formData.context"
                label="Contexto (opcional)"
                placeholder="Digite o contexto relevante aqui..."
                variant="outlined"
                rows="4"
                class="mb-4"
                hint="Forneça informações de contexto que podem ajudar no processamento"
                persistent-hint
              />

              <!-- Tipo de processamento -->
              <v-row>
                <v-col cols="12" md="8">
                  <v-combobox
                    v-model="selectedProcessingType"
                    :items="processingOptions"
                    item-title="text"
                    item-value="value"
                    label="Tipo de Processamento"
                    variant="outlined"
                    :rules="processingTypeRules"
                    required
                    hint="Escolha como você quer processar a pergunta"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    :disabled="!formValid || processing"
                    :loading="processing"
                    @click="processar"
                  >
                    <v-icon class="mr-2">mdi-play</v-icon>
                    Processar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resultado do processamento -->
    <v-row v-if="processedAnswer">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-check-circle</v-icon>
            Resposta Final
          </v-card-title>
          <v-card-text class="card-text-scroll-answer">
            {{ processedAnswer }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visualização do grafo -->
    <v-row v-if="processedAnswer">
      <v-col cols="12" md="8">
        <v-card class="pa-4 min-h-600" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-graph</v-icon>
            Grafo do Processamento Cognee
          </v-card-title>
          <v-card-text class="d-flex align-center justify-center fill-height">
            <GraphViewer
              :nodes="graphData.nodes"
              :edges="graphData.edges"
              @node-selected="onNodeSelected"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Detalhes do nó selecionado -->
      <v-col cols="12" md="4" v-if="selectedNode">
        <v-card class="pa-4 fill-height" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-information</v-icon>
            Detalhes do Nó
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="(value, key) in selectedNode"
                :key="key"
                class="mb-2"
              >
                <v-list-item-title class="font-weight-bold">
                  {{ key }}:
                </v-list-item-title>
                <v-list-item-subtitle class="wrap-text">
                  {{ typeof value === "object" ? JSON.stringify(value) : value }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Métricas do grafo -->
    <v-row v-if="processedAnswer">
      <v-col cols="12">
        <GraphMetrics :metrics="analise ?? undefined" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar os componentes necessários
import GraphViewer from "./GraphViewer.vue";
import GraphMetrics from "./GraphMetrics.vue";

export default {
  name: "ProcessingFreeTextDashboard",

  // Registrar os componentes filhos
  components: {
    GraphViewer,
    GraphMetrics,
  },

  data() {
    return {
      // Validação do formulário
      formValid: false,

      // Dados do formulário
      formData: {
        question: "",
        context: "",
      },

      // ID da tarefa de processamento no servidor
      taskId: null,

      // Opções de tipos de processamento disponíveis
      processingOptions: [
        { text: "Pergunta Principal", value: 1 },
        { text: "Sequência de Perguntas", value: 2 },
        { text: "Pergunta Principal com Ontologia", value: 3 },
        { text: "Sequência de Perguntas com Ontologia", value: 4 },
      ],

      // Tipo de processamento selecionado pelo usuário
      selectedProcessingType: null,

      // Estado de processamento (se está processando ou não)
      processing: false,

      // Resposta processada pelo servidor
      processedAnswer: null,

      // Dados do grafo gerado pelo processamento
      graphData: {
        nodes: {},
        edges: {},
      },

      // Análise dos dados processados
      analise: null,

      // Nó selecionado no grafo
      selectedNode: null,

      // Regras de validação do formulário
      questionRules: [
        (v) => !!v || "Pergunta é obrigatória",
        (v) => (v && v.length >= 10) || "Pergunta deve ter pelo menos 10 caracteres",
      ],
      processingTypeRules: [
        (v) => !!v || "Tipo de processamento é obrigatório",
      ],
    };
  },

  methods: {
    /**
     * Método principal para processar uma pergunta
     * Este método inicia o processamento no servidor e monitora o progresso
     */
    async processar() {
      // Validar formulário
      if (!this.formValid) {
        this.showSnackbar("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
      }

      // Preparar os dados para enviar ao servidor
      const payload = {
        selectedQuestion: {
          question: this.formData.question,
          context: this.formData.context ? [["Contexto", [this.formData.context]]] : [],
          answer: "",
          no_of_hops: 0,
          reasoning_type: "free_text",
          _id: `free_text_${Date.now()}`,
        },
        processingType: this.selectedProcessingType,
      };

      try {
        // Fazer a requisição para iniciar o processo no servidor
        const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";
        const response = await fetch(`${baseUrl}/runquestion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.status !== 202) {
          const errorData = await response.json();
          throw new Error(
            `Erro ao iniciar a tarefa: ${errorData.erro || response.statusText}`
          );
        }

        const { task_id } = await response.json();
        this.taskId = task_id;
        this.iniciarPolling(task_id);
      } catch (error) {
        this.showSnackbar("Ocorreu um erro ao iniciar o processamento.", "error");
        console.error("Erro na requisição inicial:", error);
      }
    },

    /**
     * Método para iniciar o monitoramento do status da tarefa
     */
    iniciarPolling(taskId) {
      this.pollingInterval = setInterval(async () => {
        try {
          const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";
          const response = await fetch(`${baseUrl}/status/${taskId}`);

          if (!response.ok) {
            throw new Error(`Erro ao verificar status: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.status === "SUCCESS") {
            this.finalizarPollingComSucesso(data.result);
          } else if (data.status === "FAILURE") {
            this.finalizarPollingComErro(data.result);
          }
        } catch (error) {
          this.finalizarPollingComErro({ detalhes: error.message });
        }
      }, 5000);
    },

    /**
     * Método chamado quando o processamento é concluído com sucesso
     */
    finalizarPollingComSucesso(resultado) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;

      this.processedAnswer = resultado.final_answer;
      this.graphData.nodes = resultado.nodes;
      this.graphData.edges = resultado.edges;
      this.analise = resultado.analise;

      this.showSnackbar("Processamento concluído com sucesso!", "success");
    },

    /**
     * Método chamado quando o processamento falha
     */
    finalizarPollingComErro(erro) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;

      this.showSnackbar("Ocorreu um erro no processamento do servidor.", "error");
      console.error("Erro retornado pelo backend:", erro.detalhes);
    },

    /**
     * Método chamado quando um nó do grafo é selecionado
     */
    onNodeSelected(node) {
      if (!node) {
        this.selectedNode = null;
        return;
      }
      this.selectedNode = node;
    },

    /**
     * Método para mostrar uma notificação
     */
    showSnackbar(message, color) {
      // Implementar sistema de notificações
      console.log(`${color.toUpperCase()}: ${message}`);
    },
  },

  beforeUnmount() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  },
};
</script>

<style scoped>
.min-h-600 {
  min-height: 600px;
}

.wrap-text {
  white-space: normal !important;
  word-wrap: break-word;
}

.card-text-scroll-answer {
  max-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
}
</style>
```

### 13. src/views/FreeTextProcessingView.vue
```vue
<!-- Página de processamento de texto livre -->
<!-- Esta página permite processar perguntas e contexto inseridos pelo usuário -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-btn
            icon
            @click="goBack"
            class="mr-4"
            title="Voltar"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="text-h4 font-weight-bold">
            <v-icon class="mr-2">mdi-text-box-plus</v-icon>
            Processamento de Texto Livre
          </h1>
        </div>
        <p class="text-h6 text-grey-darken-1 mt-2">
          Insira sua pergunta e contexto para processamento com IA
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Componente de processamento -->
    <ProcessingFreeTextDashboard />
  </v-container>
</template>

<script>
// Importar o componente de processamento
import ProcessingFreeTextDashboard from "../components/ProcessingFreeTextDashboard.vue";

export default {
  name: "FreeTextProcessingView",

  // Registrar os componentes
  components: {
    ProcessingFreeTextDashboard,
  },

  methods: {
    // Método para voltar à página anterior
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 14. src/views/AboutView.vue
```vue
<!-- Página sobre o projeto -->
<!-- Esta página contém informações sobre o projeto e tecnologias utilizadas -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-information</v-icon>
          Sobre o Projeto
        </h1>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Informações do projeto -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-6" outlined>
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Descrição do Projeto
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              Este é um template completo para projetos Vue.js que inclui:
            </p>
            <ul class="text-body-1 mb-4">
              <li>Vue.js 3 com Composition API</li>
              <li>Vuetify 3 para componentes Material Design</li>
              <li>Vue Router 4 para navegação SPA</li>
              <li>Vuex 4 para gerenciamento de estado</li>
              <li>v-network-graph para visualização de grafos</li>
              <li>MDI Icons para ícones</li>
              <li>Estrutura organizada e didática</li>
            </ul>
            <p class="text-body-1">
              O template foi desenvolvido pensando em facilitar o aprendizado
              e desenvolvimento de aplicações Vue.js modernas.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Informações Técnicas
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Versão:</v-list-item-title>
                <v-list-item-subtitle>1.0.0</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Vue.js:</v-list-item-title>
                <v-list-item-subtitle>3.2.13</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Vuetify:</v-list-item-title>
                <v-list-item-subtitle>3.0.0-beta.0</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Vue Router:</v-list-item-title>
                <v-list-item-subtitle>4.0.0</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seção de recursos -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="pa-6" outlined>
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Recursos Incluídos
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
                <v-card class="pa-4 text-center" elevation="1">
                  <v-icon :color="feature.color" size="48" class="mb-3">
                    {{ feature.icon }}
                  </v-icon>
                  <h4 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h4>
                  <p class="text-body-2 text-grey-darken-1">{{ feature.description }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutView",

  data() {
    return {
      // Recursos do template
      features: [
        {
          title: "Layout Responsivo",
          description: "Design adaptável para diferentes dispositivos",
          icon: "mdi-responsive",
          color: "primary",
        },
        {
          title: "Sistema de Rotas",
          description: "Navegação organizada com Vue Router",
          icon: "mdi-routes",
          color: "secondary",
        },
        {
          title: "Componentes Reutilizáveis",
          description: "Estrutura modular e organizada",
          icon: "mdi-puzzle",
          color: "success",
        },
        {
          title: "Sistema de Notificações",
          description: "Feedback visual para o usuário",
          icon: "mdi-bell",
          color: "warning",
        },
        {
          title: "Visualização de Grafos",
          description: "Integração com v-network-graph",
          icon: "mdi-graph",
          color: "info",
        },
        {
          title: "Código Documentado",
          description: "Comentários e estrutura didática",
          icon: "mdi-book-open",
          color: "purple",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos específicos da página sobre */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 13. src/plugins/vuetify.js
```javascript
// Configuração do Vuetify
// Este arquivo configura o tema e componentes do Vuetify

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Importar ícones MDI
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

// Configuração do tema
const lightTheme = {
  dark: false,
  colors: {
    primary: "#1976D2",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: "#2196F3",
    secondary: "#424242",
    accent: "#FF4081",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
};

// Criar instância do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VBtn: {
      variant: "elevated",
    },
    VCard: {
      variant: "elevated",
    },
  },
});

export default vuetify;
```

### 14. src/plugins/webfontloader.js
```javascript
// Configuração do WebFontLoader
// Este arquivo carrega as fontes necessárias para a aplicação

import { loadFonts } from "@vuetify/vue3";

// Carregar fontes do Vuetify
loadFonts();

// Exportar função para uso em outros arquivos
export { loadFonts };
```

### 15. src/config/api.js
```javascript
// Configurações da API
// Este arquivo contém as configurações para comunicação com o servidor

// URL base da API (pode ser alterada para diferentes ambientes)
export const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

// Endpoints da API
export const API_ENDPOINTS = {
  // Endpoint para dados gerais
  DATA: "/api/data",

  // Endpoint para usuários
  USERS: "/api/users",

  // Endpoint para configurações
  SETTINGS: "/api/settings",
};

// Configurações de timeout para requisições
export const REQUEST_TIMEOUT = 30000; // 30 segundos

// Configurações de polling (verificação de status)
export const POLLING_INTERVAL = 5000; // 5 segundos
export const MAX_POLLING_ATTEMPTS = 60; // Máximo de tentativas (5 minutos)

// Configurações de notificações
export const NOTIFICATION_TIMEOUT = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
};
```

### 16. src/composables/useNotifications.js
```javascript
// Composable para gerenciar notificações
// Este composable fornece métodos para mostrar diferentes tipos de notificações

import { ref } from "vue";

// Estado global das notificações
const snackbar = ref({
  visible: false,
  message: "",
  color: "info",
  timeout: 3000,
  icon: null,
  multiLine: false,
});

const processingSnackbar = ref({
  visible: false,
  message: "Processando...",
  elapsed: 0,
});

let processingTimer = null;

/**
 * Composable para gerenciar notificações
 * @returns {Object} Objeto com métodos para controlar notificações
 */
export function useNotifications() {
  /**
   * Método para mostrar uma notificação
   * @param {string} message - Mensagem a ser exibida
   * @param {string} color - Cor da notificação (success, error, warning, info)
   * @param {Object} options - Opções adicionais
   */
  const showNotification = (message, color = "info", options = {}) => {
    snackbar.value = {
      visible: true,
      message,
      color,
      timeout: options.timeout || 3000,
      icon: options.icon || null,
      multiLine: options.multiLine || false,
    };
  };

  /**
   * Método para fechar a notificação atual
   */
  const closeNotification = () => {
    snackbar.value.visible = false;
  };

  /**
   * Método para mostrar notificação de sucesso
   * @param {string} message - Mensagem de sucesso
   */
  const showSuccess = (message) => {
    showNotification(message, "success", {
      icon: "mdi-check-circle",
    });
  };

  /**
   * Método para mostrar notificação de erro
   * @param {string} message - Mensagem de erro
   */
  const showError = (message) => {
    showNotification(message, "error", {
      icon: "mdi-alert-circle",
      timeout: 5000,
    });
  };

  /**
   * Método para mostrar notificação de aviso
   * @param {string} message - Mensagem de aviso
   */
  const showWarning = (message) => {
    showNotification(message, "warning", {
      icon: "mdi-alert",
    });
  };

  /**
   * Método para mostrar notificação de informação
   * @param {string} message - Mensagem informativa
   */
  const showInfo = (message) => {
    showNotification(message, "info", {
      icon: "mdi-information",
    });
  };

  /**
   * Método para mostrar notificação de processamento
   * @param {string} message - Mensagem de processamento
   */
  const showProcessing = (message = "Processando...") => {
    processingSnackbar.value = {
      visible: true,
      message,
      elapsed: 0,
    };

    // Iniciar timer para contagem de tempo
    processingTimer = setInterval(() => {
      processingSnackbar.value.elapsed++;
    }, 1000);
  };

  /**
   * Método para esconder notificação de processamento
   */
  const hideProcessing = () => {
    processingSnackbar.value.visible = false;

    // Limpar timer
    if (processingTimer) {
      clearInterval(processingTimer);
      processingTimer = null;
    }
  };

  return {
    // Estado das notificações
    snackbar,
    processingSnackbar,

    // Métodos para controlar notificações
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showProcessing,
    hideProcessing,
  };
}
```

### 17. src/store/index.js
```javascript
// Configuração do Vuex Store
// Este arquivo configura o gerenciamento de estado global da aplicação

import { createStore } from "vuex";

// Criar a store do Vuex
const store = createStore({
  // Estado global da aplicação
  state: {
    // Dados da aplicação
    user: null,
    settings: {},
    notifications: [],

    // Estado de carregamento
    loading: false,

    // Dados específicos da aplicação
    data: [],
  },

  // Getters para acessar o estado
  getters: {
    // Getter para verificar se o usuário está logado
    isLoggedIn: (state) => !!state.user,

    // Getter para obter configurações
    getSettings: (state) => state.settings,

    // Getter para verificar se está carregando
    isLoading: (state) => state.loading,

    // Getter para obter dados
    getData: (state) => state.data,
  },

  // Mutations para modificar o estado
  mutations: {
    // Mutation para definir usuário
    SET_USER(state, user) {
      state.user = user;
    },

    // Mutation para definir configurações
    SET_SETTINGS(state, settings) {
      state.settings = settings;
    },

    // Mutation para definir estado de carregamento
    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    // Mutation para definir dados
    SET_DATA(state, data) {
      state.data = data;
    },

    // Mutation para adicionar notificação
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },

    // Mutation para remover notificação
    REMOVE_NOTIFICATION(state, index) {
      state.notifications.splice(index, 1);
    },
  },

  // Actions para operações assíncronas
  actions: {
    // Action para fazer login
    async login({ commit }, credentials) {
      commit("SET_LOADING", true);
      try {
        // Simular requisição de login
        const user = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ id: 1, name: "Usuário", email: credentials.email });
          }, 1000);
        });
        commit("SET_USER", user);
        return user;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    // Action para fazer logout
    logout({ commit }) {
      commit("SET_USER", null);
    },

    // Action para carregar dados
    async loadData({ commit }) {
      commit("SET_LOADING", true);
      try {
        // Simular carregamento de dados
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: "Item 1" },
              { id: 2, name: "Item 2" },
              { id: 3, name: "Item 3" },
            ]);
          }, 1000);
        });
        commit("SET_DATA", data);
        return data;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  // Módulos da store (para organizar melhor)
  modules: {},
});

export default store;
```

### 18. .env.example
```bash
# Configurações de ambiente da aplicação
# Este arquivo contém variáveis de ambiente para diferentes ambientes

# URL base da API do servidor
VUE_APP_API_BASE_URL=http://localhost:3000

# Título da aplicação
VUE_APP_TITLE=Meu Projeto Vue

# Versão da aplicação
VUE_APP_VERSION=1.0.0

# Modo de desenvolvimento
NODE_ENV=development
```

### 19. vue.config.js
```javascript
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuração do Vuetify
  pluginOptions: {
    vuetify: {
      theme: {
        defaultTheme: "light",
      },
      icons: {
        defaultSet: "mdi",
      },
    },
  },

  // Configurações de desenvolvimento
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },

  // Configurações de build
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',

  // Configurações de CSS
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: process.env.NODE_ENV === 'development',
  },

  // Configurações de Webpack
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },

  // Configurações de chainWebpack
  chainWebpack: (config) => {
    // Configurações específicas do Webpack
    config.plugin('html').tap((args) => {
      args[0].title = 'Meu Projeto Vue'
      return args
    })
  },
})
```

### 20. vuetify.config.js
```javascript
module.exports = {
  theme: {
    defaultTheme: "light",
  },
  icons: {
    defaultSet: "mdi",
  },
};
```

### 21. .eslintrc.js
```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "warn",
    "vue/no-unused-components": "warn",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    jest: "readonly",
    describe: "readonly",
    it: "readonly",
    expect: "readonly",
    beforeEach: "readonly",
    afterEach: "readonly",
    beforeAll: "readonly",
    afterAll: "readonly",
  },
};
```

### 22. .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 23. .gitignore
```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Build outputs
dist/
build/

# Coverage
coverage/

# Storybook
storybook-static/

# Temporary files
tmp/
temp/
```

### 24. .env.example
```bash
# Configurações de ambiente da aplicação
# Este arquivo contém variáveis de ambiente para diferentes ambientes

# URL base da API do servidor
VUE_APP_API_BASE_URL=http://localhost:5001

# Título da aplicação
VUE_APP_TITLE=Meu Projeto Vue

# Versão da aplicação
VUE_APP_VERSION=1.0.0

# Modo de desenvolvimento
NODE_ENV=development

# Configurações do servidor de desenvolvimento
VUE_APP_DEV_SERVER_PORT=8080
VUE_APP_DEV_SERVER_HOST=localhost

# Configurações de build
VUE_APP_PUBLIC_PATH=/
VUE_APP_OUTPUT_DIR=dist
VUE_APP_ASSETS_DIR=static

# Configurações de CSS
VUE_APP_CSS_EXTRACT=true
VUE_APP_CSS_SOURCE_MAP=false

# Configurações de Webpack
VUE_APP_WEBPACK_ALIAS=@

# Configurações de PWA
VUE_APP_PWA_NAME=Meu Projeto Vue
VUE_APP_PWA_THEME_COLOR=#1976D2
VUE_APP_PWA_MS_TILE_COLOR=#1976D2
VUE_APP_PWA_APPLE_MOBILE_WEB_APP_CAPABLE=yes
VUE_APP_PWA_APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE=black
```

### 25. .editorconfig
```ini
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2

[*.{json,yml,yaml}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{html,css,scss,sass}]
indent_style = space
indent_size = 2

[*.{py}]
indent_style = space
indent_size = 4

[Makefile]
indent_style = tab
```

### 26. babel.config.js
```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // Adicionar plugins do Babel se necessário
  ]
}
```

### 27. postcss.config.js
```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
    // Adicionar outros plugins do PostCSS se necessário
  }
}
```

### 28. jest.config.js
```javascript
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(vuetify|@mdi|@fortawesome)/)'
  ]
}
```

### 29. tests/setup.js
```javascript
// Configuração global para testes Jest
import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Configurar Vuetify para testes
const vuetify = createVuetify({
  components,
  directives,
})

// Configurar globalmente
config.global.plugins = [vuetify]

// Mock do console para evitar logs desnecessários nos testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Mock do fetch global
global.fetch = jest.fn()

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock do sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock do ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock do IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
```

### 30. tests/unit/App.spec.js
```javascript
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('has the correct structure', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'AppLayout' }).exists()).toBe(true)
  })

  it('renders without crashing', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

### 31. .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ],
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false,
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "prettier",
  "vetur.format.defaultFormatter.vue": "prettier",
  "files.associations": {
    "*.vue": "vue"
  },
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}
```

### 32. .vscode/extensions.json
```json
{
  "recommendations": [
    "vue.volar",
    "vue.vscode-typescript-vue-plugin",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-css-peek",
    "zignd.html-css-class-completion",
    "ritwickdey.liveserver",
    "ms-vscode.live-server"
  ]
}
```

### 33. jsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 34. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 35. Dockerfile
```dockerfile
# Dockerfile para aplicação Vue.js
FROM node:16-alpine as build-stage

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção
FROM nginx:stable-alpine as production-stage

# Copiar arquivos de build
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 36. nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
        root         /usr/share/nginx/html;
        index        index.html;

        # Configuração para SPA
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Configuração para assets estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Configuração para arquivos HTML
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }

        # Configuração de segurança
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    }
}
```

### 37. docker-compose.yml
```yaml
version: '3.8'

services:
  # Serviço da aplicação Vue.js
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - app-network

  # Serviço de desenvolvimento (opcional)
  frontend-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run serve
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 38. Dockerfile.dev
```dockerfile
# Dockerfile para desenvolvimento
FROM node:16-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta 8080
EXPOSE 8080

# Comando para desenvolvimento
CMD ["npm", "run", "serve"]
```

### 39. .github/workflows/ci.yml
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run tests
      run: npm run test:unit

    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 40. .github/dependabot.yml
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "tiagoriosdarocha"
    assignees:
      - "tiagoriosdarocha"
    commit-message:
      prefix: "chore"
      include: "scope"
    labels:
      - "dependencies"
      - "javascript"
```

### 41. renovate.json
```json
{
  "extends": [
    "config:base"
  ],
  "schedule": [
    "before 6am on monday"
  ],
  "timezone": "America/Sao_Paulo",
  "labels": [
    "dependencies"
  ],
  "packageRules": [
    {
      "matchUpdateTypes": [
        "minor",
        "patch"
      ],
      "matchCurrentVersion": "!/^0/",
      "automerge": true
    },
    {
      "matchDepTypes": [
        "devDependencies"
      ],
      "automerge": true
    }
  ],
  "vulnerabilityAlerts": {
    "labels": [
      "security"
    ]
  }
}
```

### 42. .husky/pre-commit
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Executar linter antes do commit
npm run lint
```

### 43. .husky/commit-msg
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Executar commitlint para validar mensagem de commit
npx --no -- commitlint --edit $1
```

### 44. commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert'
      ]
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never']
  }
}
```

### 45. codecov.yml
```yaml
coverage:
  status:
    project:
      default:
        target: 80%
        threshold: 5%
    patch:
      default:
        target: 80%
        threshold: 5%

comment:
  layout: "header,diff,files,footer"
  behavior: default
  require_changes: false
  require_base: no
  require_head: yes

github_checks:
  annotations: true
```

### 23. README.md
```markdown
# Meu Projeto Vue

Aplicação Vue.js com Vuetify, Vue Router e v-network-graph.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript reativo
- **Vuetify 3**: Biblioteca de componentes Material Design
- **Vue Router 4**: Sistema de roteamento
- **Vuex 4**: Gerenciamento de estado
- **v-network-graph**: Visualização de grafos interativos
- **MDI Icons**: Ícones Material Design

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── layout/         # Componentes de layout
├── views/              # Páginas da aplicação
├── layouts/            # Layouts da aplicação
├── router/             # Configuração do Vue Router
├── store/              # Gerenciamento de estado
├── composables/        # Composables reutilizáveis
├── config/             # Configurações da aplicação
├── plugins/            # Plugins do Vue
└── assets/             # Recursos estáticos
```

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd meu-projeto-vue
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute o servidor de desenvolvimento:
```bash
npm run serve
```

5. Acesse a aplicação em `http://localhost:8080`

## 📝 Scripts Disponíveis

- `npm run serve`: Executa o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run lint`: Executa o linter para verificar código

## 🎨 Personalização

### Temas
O projeto usa Vuetify 3 com tema personalizável. Para alterar o tema, modifique o arquivo `src/plugins/vuetify.js`.

### Componentes
Todos os componentes estão organizados de forma modular e podem ser facilmente personalizados ou reutilizados.

## 📚 Documentação

- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [v-network-graph](https://github.com/kamiyaowl/v-network-graph)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Vue.js e Vuetify**
```

## 🚀 Como Usar Este Template

1. **Copie os arquivos** para seu novo projeto
2. **Instale as dependências**: `npm install`
3. **Configure as variáveis de ambiente** no arquivo `.env`
4. **Personalize** os componentes conforme sua necessidade
5. **Execute** o projeto: `npm run serve`

## 🆕 Novas Funcionalidades Implementadas

### 📝 Processamento de Texto Livre
- **Formulário completo** para inserção de perguntas e contexto
- **Validação em tempo real** dos campos obrigatórios
- **Processamento assíncrono** com monitoramento de status
- **Visualização de grafos** interativa dos resultados
- **Métricas e análise** dos dados processados

### 🎨 Interface Aprimorada
- **Navegação intuitiva** com menu lateral
- **Cards responsivos** na página inicial
- **Sistema de notificações** unificado
- **Feedback visual** para todas as ações
- **Design consistente** em toda a aplicação

### ⚙️ Configurações Otimizadas
- **Configuração do Vuetify** corrigida e otimizada
- **Linting e formatação** automática
- **Estrutura de pastas** organizada e didática
- **Código comentado** para facilitar aprendizado
- **Configurações de build** otimizadas

### 🔧 Melhorias Técnicas
- **Tratamento de erros** robusto
- **Validação de formulários** completa
- **Processamento assíncrono** com polling
- **Reutilização de componentes** otimizada
- **Sistema de rotas** completo e funcional

## ✨ Características do Template

- ✅ **Estrutura organizada** e didática
- ✅ **Código comentado** para facilitar aprendizado
- ✅ **Componentes reutilizáveis** bem estruturados
- ✅ **Sistema de notificações** completo
- ✅ **Layout responsivo** com Vuetify
- ✅ **Navegação** com Vue Router
- ✅ **Gerenciamento de estado** com Vuex
- ✅ **Visualização de grafos** com v-network-graph
- ✅ **Processamento de texto livre** com formulários
- ✅ **Validação de formulários** em tempo real
- ✅ **Processamento assíncrono** com polling
- ✅ **Sistema de rotas** completo
- ✅ **Ícones MDI** integrados
- ✅ **Configurações** centralizadas
- ✅ **Documentação** completa
- ✅ **Configuração do Vuetify** otimizada
- ✅ **Linting e formatação** automática

## 🔧 Configurações Adicionais

### Scripts de Inicialização
```bash
# Instalar dependências
npm install

# Configurar Husky
npm run prepare

# Configurar commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact

# Executar linter
npm run lint:fix

# Executar testes
npm run test:unit

# Executar formatação
npm run format
```

### Configurações de Ambiente
1. **Copie o arquivo `.env.example` para `.env`**
2. **Configure as variáveis de ambiente** conforme necessário
3. **Ajuste as configurações** nos arquivos de configuração

### Configurações do VS Code
1. **Instale as extensões recomendadas** listadas em `.vscode/extensions.json`
2. **As configurações** em `.vscode/settings.json` serão aplicadas automaticamente

### Configurações de Git
1. **Configure o commitizen** para commits padronizados
2. **Configure o Husky** para hooks de pre-commit
3. **Configure o commitlint** para validação de mensagens

### Configurações de Docker
1. **Para desenvolvimento**: `npm run docker:dev`
2. **Para produção**: `npm run docker:prod`
3. **Para build**: `npm run docker:build`

### Configurações de CI/CD
1. **GitHub Actions** configurado em `.github/workflows/ci.yml`
2. **Dependabot** configurado em `.github/dependabot.yml`
3. **Renovate** configurado em `renovate.json`

### Configurações de Testes
1. **Jest** configurado para testes unitários
2. **Vue Test Utils** para testes de componentes
3. **Coverage** configurado para relatórios de cobertura

### Configurações de Qualidade de Código
1. **ESLint** para análise de código
2. **Prettier** para formatação
3. **Husky** para hooks de Git
4. **Commitlint** para validação de commits

Este template fornece uma base sólida e didática para novos projetos Vue.js! 🎉
