<!-- Página inicial da aplicação -->
<!-- Esta é a primeira página que o usuário vê ao acessar a aplicação -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold text-primary mb-4">
          <v-icon size="large" class="mr-3">mdi-brain</v-icon>
          Cognee - MorehopeQA
        </h1>
        <p class="text-h6 text-grey-darken-1">
          Sistema de Análise e Processamento de Perguntas com IA
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
            Acesse o painel principal para visualizar e analisar perguntas
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

      <!-- Card: Processamento de Texto Livre -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="navigateToFreeText"
        >
          <v-icon size="64" color="secondary" class="mb-4"> mdi-text-box-plus </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Texto Livre</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Processe perguntas e contexto inseridos livremente
          </p>
          <v-btn
            color="secondary"
            variant="outlined"
            @click="navigateToFreeText"
          >
            Processar Texto
          </v-btn>
        </v-card>
      </v-col>

      <!-- Card: Comparação de Grafos -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="navigateToCompare"
        >
          <v-icon size="64" color="success" class="mb-4"> mdi-graph </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Comparar Grafos</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Compare diferentes grafos de processamento e análise
          </p>
          <v-btn
            color="success"
            variant="outlined"
            @click="navigateToCompare"
          >
            Comparar Grafos
          </v-btn>
        </v-card>
      </v-col>

      <!-- Card: Sobre o Projeto -->
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 text-center h-100"
          elevation="2"
          hover
          @click="openAbout"
        >
          <v-icon size="64" color="success" class="mb-4">
            mdi-information
          </v-icon>
          <h3 class="text-h5 font-weight-bold mb-3">Sobre o Projeto</h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Conheça mais sobre o Cognee e suas funcionalidades
          </p>
          <v-btn color="success" variant="outlined" @click="openAbout">
            Saiba Mais
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seção de estatísticas rápidas -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="1">
          <h3 class="text-h5 font-weight-bold mb-4 text-center">
            Estatísticas do Sistema
          </h3>
          <v-row>
            <v-col cols="12" sm="3" class="text-center">
              <div class="text-h4 font-weight-bold text-primary">
                {{ stats.totalQuestions }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                Perguntas Disponíveis
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <div class="text-h4 font-weight-bold text-secondary">
                {{ stats.processedQuestions }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                Perguntas Processadas
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <div class="text-h4 font-weight-bold text-success">
                {{ stats.activeComparisons }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                Comparações Ativas
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <div class="text-h4 font-weight-bold text-warning">
                {{ stats.successRate }}%
              </div>
              <div class="text-body-2 text-grey-darken-1">Taxa de Sucesso</div>
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

  data() {
    return {
      // Estatísticas do sistema (dados de exemplo)
      stats: {
        totalQuestions: 150,
        processedQuestions: 89,
        activeComparisons: 12,
        successRate: 94,
      },
    };
  },

  methods: {
    // Método para navegar para o dashboard
    navigateToDashboard() {
      this.$router.push({ name: "dashboard" });
    },

    // Método para navegar para a página de processamento de texto livre
    navigateToFreeText() {
      this.$router.push({ name: "free-text" });
    },

    // Método para navegar para a página de comparação
    navigateToCompare() {
      this.$router.push({ name: "compare" });
    },

    // Método para abrir informações sobre o projeto
    openAbout() {
      // TODO: Implementar modal ou página sobre o projeto
      console.log("Abrir informações sobre o projeto");
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
