<template>
  <v-container fluid class="pa-6">
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-center">
          <v-icon class="mr-2">mdi-view-dashboard</v-icon>
          Dashboard de Análise
        </h1>
      </v-col>
    </v-row>

    <v-divider class="my-6" />

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

    <v-row v-if="selectedItem">
      <v-col cols="12" md="6">
        <ProcessingDashboard
          :selectedItem="selectedItem"
          :panel-position="'left'" @graph_id="id => addToGraphIds(id, 'left')" />
      </v-col>

      <v-col cols="12" md="6">
        <ProcessingDashboard
          :selectedItem="selectedItem"
          :panel-position="'right'" @graph_id="id => addToGraphIds(id, 'right')" />
      </v-col>
    </v-row>

    <v-row v-if="exibirComparePanel">
      <v-col cols="12">
        <VennDiagram :graph1_id="graphIdLeft" :graph2_id="graphIdRight" />
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

      // IDs dos grafos para comparação (sempre os 2 últimos)
      graphIdLeft: null,
      graphIdRight: null,

      // Controla se o painel de comparação deve ser exibido
      exibirComparePanel: false,

      // Estado de carregamento
      loading: false,
    };
  },

  methods: {
    // Método para selecionar um item da tabela
    selectItem(event, { item }) {
      const newItem = item.raw || item || null;
      if (
        newItem &&
        (!this.selectedItem || this.selectedItem._id !== newItem._id)
      ) {
        // Limpa os IDs específicos ao mudar de item
        this.graphIdLeft = null;
        this.graphIdRight = null;
        this.exibirComparePanel = false;
        console.log("Nova seleção, limpando comparação anterior.");
      }
      this.selectedItem = newItem;
      console.log("Item selecionado:", this.selectedItem);
    },

    // Método para limpar a seleção
    clearSelection() {
      this.selectedItem = null;
      // Limpa os IDs específicos
      this.graphIdLeft = null;
      this.graphIdRight = null;
      this.exibirComparePanel = false;
      console.log("Seleção limpa.");
    },

    // Método para definir propriedades das linhas da tabela
    rowProps({ item }) {
      const currentId = item.value || item._id;
      const isMatch = this.selectedItem && this.selectedItem._id === currentId;
      return { class: isMatch ? "selected-row" : "" };
    },

    // Método para adicionar ID de grafo, mantendo apenas os 2 últimos
    addToGraphIds(receivedId, position) {
      if (position === 'left') {
        this.graphIdLeft = receivedId;
        console.log("Atualizado ID Esquerdo:", receivedId);
      } else if (position === 'right') {
        this.graphIdRight = receivedId;
        console.log("Atualizado ID Direito:", receivedId);
      }

      console.log(`IDs Atuais: Esquerdo=${this.graphIdLeft}, Direito=${this.graphIdRight}`);

      // Mostra o painel de comparação APENAS se ambos os IDs estiverem definidos
      if (this.graphIdLeft && this.graphIdRight) {
        this.exibirComparePanel = true;
        console.log("Ambos IDs presentes. Exibir/Atualizar painel de comparação");
      } else {
        this.exibirComparePanel = false;
        console.log("Falta um ou ambos os IDs. Esconder painel de comparação.");
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do dashboard */
.selected-row {
  background-color: #07f04d !important; /* Verde vibrante */
  font-weight: bold !important;
  color: black !important;
}

/* Garante que a cor do texto seja legível no fundo verde */
.selected-row td {
  color: black !important;
}
</style>