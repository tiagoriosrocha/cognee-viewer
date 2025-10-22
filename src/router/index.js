// Configuração do Vue Router
// Este arquivo define todas as rotas da aplicação

import { createRouter, createWebHistory } from "vue-router";

// Importar as views (páginas) da aplicação
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import QuestionDetailsView from "../views/QuestionDetailsView.vue";
import CompareView from "../views/CompareView.vue";
import FreeTextProcessingView from "../views/FreeTextProcessingView.vue";

// Definir as rotas da aplicação
const routes = [
  {
    // Rota principal - página inicial
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Início - Cognee MorehopeQA",
    },
  },
  {
    // Rota do dashboard principal
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard - Cognee MorehopeQA",
    },
  },
  {
    // Rota para detalhes de uma pergunta específica
    path: "/question/:id",
    name: "question-details",
    component: QuestionDetailsView,
    props: true, // Permite passar o parâmetro id como prop
    meta: {
      title: "Detalhes da Pergunta - Cognee MorehopeQA",
    },
  },
    {
      // Rota para comparação de grafos
      path: "/compare",
      name: "compare",
      component: CompareView,
      meta: {
        title: "Comparação de Grafos - Cognee MorehopeQA",
      },
    },
    {
      // Rota para processamento de texto livre
      path: "/free-text",
      name: "free-text",
      component: FreeTextProcessingView,
      meta: {
        title: "Processamento de Texto Livre - Cognee MorehopeQA",
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
