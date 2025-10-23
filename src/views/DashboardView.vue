<!-- Página do Dashboard principal -->
<!-- Esta página contém a funcionalidade principal de análise de perguntas -->

<template>
  <v-container fluid class="pa-6">
    <!-- Cabeçalho da página -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-view-dashboard</v-icon>
          Dashboard de Análise
        </h1>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Tabela de Perguntas -->
    <v-expand-transition>
      <v-row v-if="!selectedItem" class="mb-6">
        <v-col cols="12">
          <v-card class="pa-4" outlined>
            <v-card-title class="text-h6 font-weight-medium">
              Selecione uma Pergunta
            </v-card-title>
            <v-card-text>
              <v-data-table
                :items="dataset"
                :headers="tableHeaders"
                item-value="_id"
                @click:row="selectItem"
                class="elevation-1"
                :row-props="rowProps"
                :loading="loading"
                loading-text="Carregando perguntas..."
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>

    <!-- Detalhes do Item Selecionado -->
    <v-row v-if="selectedItem" class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium d-flex align-center">
            Detalhes do Item
            <v-spacer />
            <v-btn icon @click="clearSelection" title="Limpar seleção">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <QuestionDetails :question="selectedItem" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mensagem caso nenhum item seja selecionado -->
    <v-row v-else class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-text class="text-center text-subtitle-1 text-medium-emphasis">
            Clique em uma linha da tabela para ver os detalhes.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <!-- Painéis de Processamento -->
    <v-row v-if="selectedItem">
      <v-col cols="12" md="6">
        <ProcessingDashboard
          :selectedItem="selectedItem"
          @graph_id="addToGraphIds"
        />
      </v-col>

      <v-col cols="12" md="6">
        <ProcessingDashboard
          :selectedItem="selectedItem"
          @graph_id="addToGraphIds"
        />
      </v-col>
    </v-row>

    <!-- Painel de Comparação -->
    <v-row v-if="exibirComparePanel">
      <v-col cols="12">     
        <VennDiagram :graph1_id="graphIds[0]" :graph2_id="graphIds[1]" />
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
import VennDiagram from "@/components/VennDiagram.vue";

export default {
  name: "DashboardView",

  // Registrar os componentes
  components: {
    QuestionDetails,
    ProcessingDashboard,
    VennDiagram,
  },

  data() {
    return {
      // Dataset de perguntas
      dataset,

      // Item selecionado na tabela
      selectedItem: null,

      // Configuração dos cabeçalhos da tabela
      tableHeaders: [
        { title: "ID", align: "start", sortable: false, key: "_id" },
        { title: "Pergunta", align: "start", key: "question" },
        { title: "Hops", align: "end", key: "no_of_hops" },
        { title: "Tipo de Raciocínio", align: "start", key: "reasoning_type" },
      ],

      // IDs dos grafos para comparação
      graphIds: [],

      // Controla se o painel de comparação deve ser exibido
      exibirComparePanel: false,

      // Estado de carregamento
      loading: false,
    };
  },

  methods: {
    // Método para selecionar um item da tabela
    selectItem(event, { item }) {
      this.selectedItem = item.raw || item || null;
      console.log("Item selecionado:", this.selectedItem);
    },

    // Método para limpar a seleção
    clearSelection() {
      this.selectedItem = null;
      this.graphIds = [];
      this.exibirComparePanel = false;
    },

    // Método para definir propriedades das linhas da tabela
    rowProps({ item }) {
      const isMatch = this.selectedItem && this.selectedItem._id === item._id;
      return { class: isMatch ? "selected-row" : "" };
    },

    // Método para adicionar ID de grafo à lista de comparação
    addToGraphIds(receivedId) {
      this.graphIds.push(receivedId);
      console.log("Novo ID adicionado:", receivedId);
      console.log("Vetor atual:", this.graphIds);

      // Se temos 2 grafos, mostrar o painel de comparação
      if (this.graphIds.length === 2) {
        this.exibirComparePanel = true;
        console.log("Exibir painel de comparação");
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do dashboard */
.selected-row {
  background-color: #07f04d !important;
  font-weight: bold !important;
  color: black !important;
}
</style>
