<!-- Página de comparação de grafos -->
<!-- Esta página permite comparar diferentes grafos de processamento -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-graph</v-icon>
          Comparação de Grafos
        </h1>
        <p class="text-h6 text-grey-darken-1 text-center mt-2">
          Compare diferentes grafos de processamento e análise
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Instruções de uso -->
    <v-row v-if="!hasGraphsToCompare" class="mb-6">
      <v-col cols="12">
        <v-card class="pa-6" outlined>
          <v-card-text class="text-center">
            <v-icon size="64" color="grey" class="mb-4">
              mdi-graph-outline
            </v-icon>
            <h3 class="text-h5 mb-3">Como usar a comparação de grafos</h3>
            <p class="text-body-1 text-grey-darken-1 mb-4">
              Para comparar grafos, você precisa processar perguntas no
              dashboard primeiro. Cada processamento gera um grafo que pode ser
              usado para comparação.
            </p>
            <v-btn color="primary" @click="goToDashboard" size="large">
              <v-icon class="mr-2">mdi-view-dashboard</v-icon>
              Ir para o Dashboard
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Seleção de grafos para comparação -->
    <v-row v-if="!hasGraphsToCompare" class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            Grafo 1
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedGraph1"
              :items="availableGraphs"
              label="Selecione o primeiro grafo"
              item-title="name"
              item-value="id"
              variant="outlined"
              :disabled="!availableGraphs.length"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            Grafo 2
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedGraph2"
              :items="availableGraphs"
              label="Selecione o segundo grafo"
              item-title="name"
              item-value="id"
              variant="outlined"
              :disabled="!availableGraphs.length"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botão para iniciar comparação -->
    <v-row v-if="!hasGraphsToCompare" class="mb-6">
      <v-col cols="12" class="text-center">
        <v-btn
          color="primary"
          size="large"
          :disabled="!canStartComparison"
          @click="startComparison"
        >
          <v-icon class="mr-2">mdi-play</v-icon>
          Iniciar Comparação
        </v-btn>
      </v-col>
    </v-row>

    <!-- Resultado da comparação -->
    <v-row v-if="hasGraphsToCompare">
      <v-col cols="12">
        <CompareGraphs :graph1_id="graph1Id" :graph2_id="graph2Id" />
      </v-col>
    </v-row>

    <!-- Histórico de comparações -->
    <v-row v-if="comparisonHistory.length > 0" class="mt-8">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium">
            Histórico de Comparações
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(comparison, index) in comparisonHistory"
                :key="index"
                class="mb-2"
              >
                <v-list-item-title>
                  Comparação {{ index + 1 }}: {{ comparison.graph1Name }} vs
                  {{ comparison.graph2Name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatDate(comparison.date) }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    icon
                    size="small"
                    @click="repeatComparison(comparison)"
                    title="Repetir comparação"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar o componente de comparação
import CompareGraphs from "../components/CompareGraphs.vue";

export default {
  name: "CompareView",

  // Registrar os componentes
  components: {
    CompareGraphs,
  },

  data() {
    return {
      // Grafos selecionados para comparação
      selectedGraph1: null,
      selectedGraph2: null,

      // IDs dos grafos para comparação
      graph1Id: null,
      graph2Id: null,

      // Lista de grafos disponíveis (dados de exemplo)
      availableGraphs: [
        { id: "graph1", name: "Grafo de Processamento 1" },
        { id: "graph2", name: "Grafo de Processamento 2" },
        { id: "graph3", name: "Grafo de Processamento 3" },
      ],

      // Histórico de comparações
      comparisonHistory: [],
    };
  },

  computed: {
    // Verifica se há grafos para comparar
    hasGraphsToCompare() {
      return this.graph1Id && this.graph2Id;
    },

    // Verifica se pode iniciar a comparação
    canStartComparison() {
      return (
        this.selectedGraph1 &&
        this.selectedGraph2 &&
        this.selectedGraph1 !== this.selectedGraph2
      );
    },
  },

  methods: {
    // Método para iniciar a comparação
    startComparison() {
      if (!this.canStartComparison) {
        return;
      }

      // Definir os IDs dos grafos
      this.graph1Id = this.selectedGraph1;
      this.graph2Id = this.selectedGraph2;

      // Adicionar ao histórico
      this.addToHistory();

      console.log("Iniciando comparação:", {
        graph1: this.graph1Id,
        graph2: this.graph2Id,
      });
    },

    // Método para adicionar comparação ao histórico
    addToHistory() {
      const graph1Name =
        this.availableGraphs.find((g) => g.id === this.graph1Id)?.name ||
        "Grafo 1";
      const graph2Name =
        this.availableGraphs.find((g) => g.id === this.graph2Id)?.name ||
        "Grafo 2";

      this.comparisonHistory.unshift({
        graph1Id: this.graph1Id,
        graph2Id: this.graph2Id,
        graph1Name,
        graph2Name,
        date: new Date(),
      });

      // Manter apenas os últimos 10 itens
      if (this.comparisonHistory.length > 10) {
        this.comparisonHistory = this.comparisonHistory.slice(0, 10);
      }
    },

    // Método para repetir uma comparação
    repeatComparison(comparison) {
      this.selectedGraph1 = comparison.graph1Id;
      this.selectedGraph2 = comparison.graph2Id;
      this.startComparison();
    },

    // Método para formatar data
    formatDate(date) {
      return new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },

    // Método para ir ao dashboard
    goToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da página de comparação */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
