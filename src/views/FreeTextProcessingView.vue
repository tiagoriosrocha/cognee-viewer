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
/* Estilos específicos da página */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
