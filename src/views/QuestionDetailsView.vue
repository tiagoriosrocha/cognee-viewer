<!-- Página de detalhes de uma pergunta específica -->
<!-- Esta página mostra informações detalhadas sobre uma pergunta selecionada -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-btn icon @click="goBack" class="mr-4" title="Voltar">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="text-h4 font-weight-bold">
            <v-icon class="mr-2">mdi-help-circle</v-icon>
            Detalhes da Pergunta
          </h1>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Carregamento -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate size="64" color="primary" />
        <p class="mt-4 text-h6">Carregando detalhes da pergunta...</p>
      </v-col>
    </v-row>

    <!-- Erro ao carregar -->
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" variant="tonal" :text="error" />
      </v-col>
    </v-row>

    <!-- Conteúdo da pergunta -->
    <v-row v-else-if="question">
      <!-- Informações básicas da pergunta -->
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            Informações Básicas
          </v-card-title>
          <v-card-text>
            <QuestionDetails :question="question" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Painel de processamento -->
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            Processamento com Cognee
          </v-card-title>
          <v-card-text>
            <ProcessingDashboard
              :selectedItem="question"
              @graph_id="handleGraphId"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pergunta não encontrada -->
    <v-row v-else>
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-text class="text-center">
            <v-icon size="64" color="grey" class="mb-4">
              mdi-help-circle-outline
            </v-icon>
            <h3 class="text-h5 mb-2">Pergunta não encontrada</h3>
            <p class="text-body-1 text-grey-darken-1">
              A pergunta com ID "{{ $route.params.id }}" não foi encontrada.
            </p>
            <v-btn color="primary" @click="goBack" class="mt-4">
              Voltar ao Dashboard
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar o dataset de perguntas
import dataset from "../dataset.json";

// Importar os componentes necessários
import QuestionDetails from "../components/QuestionDetails.vue";
import ProcessingDashboard from "../components/ProcessingDashboard.vue";

export default {
  name: "QuestionDetailsView",

  // Registrar os componentes
  components: {
    QuestionDetails,
    ProcessingDashboard,
  },

  data() {
    return {
      // Dataset de perguntas
      dataset,

      // Pergunta selecionada
      question: null,

      // Estado de carregamento
      loading: true,

      // Mensagem de erro
      error: null,
    };
  },

  // Prop para receber o ID da pergunta da URL
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  // Executar quando o componente for montado
  mounted() {
    this.loadQuestion();
  },

  // Observar mudanças no ID da pergunta
  watch: {
    id() {
      this.loadQuestion();
    },
  },

  methods: {
    // Método para carregar os detalhes da pergunta
    loadQuestion() {
      this.loading = true;
      this.error = null;

      try {
        // Buscar a pergunta pelo ID
        const question = this.dataset.find((item) => item._id === this.id);

        if (question) {
          this.question = question;
          console.log("Pergunta carregada:", question);
        } else {
          this.error = `Pergunta com ID "${this.id}" não encontrada.`;
          console.warn("Pergunta não encontrada:", this.id);
        }
      } catch (error) {
        this.error = "Erro ao carregar os detalhes da pergunta.";
        console.error("Erro ao carregar pergunta:", error);
      } finally {
        this.loading = false;
      }
    },

    // Método para voltar à página anterior
    goBack() {
      this.$router.go(-1);
    },

    // Método para lidar com IDs de grafo
    handleGraphId(graphId) {
      console.log("ID do grafo recebido:", graphId);
      // TODO: Implementar lógica para lidar com IDs de grafo
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da página de detalhes */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
