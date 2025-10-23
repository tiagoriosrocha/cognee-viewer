<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="headline text-h5">Comparação de Grafos</v-card-title>
      <v-card-subtitle>Análise dos nós em comum e únicos.</v-card-subtitle>

      <v-row v-if="nodeQuantities.length > 0" class="mb-4">
        <v-col
          v-for="(category, index) in nodeQuantities"
          :key="index"
          cols="12"
          sm="4"
        >
          <v-card class="text-center pa-3" outlined>
            <v-card-title class="justify-center text-subtitle-1">
              {{ category.name }}
            </v-card-title>
            <v-card-text class="text-h4 font-weight-bold">
              {{ category.count }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row v-if="imageUrl" justify="center">
        <v-col cols="12">
          <v-card>
            <v-img :src="imageUrl" alt="Grafo de Comparação" contain></v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else justify="center">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
          <div class="mt-2 text-subtitle-1">
            Processando comparação... Aguarde.
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      :color="snackbarColor"
      location="bottom right"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "CompareGraphs",
  props: {
    graph1_id: {
      type: String,
      required: true,
    },
    graph2_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nodeQuantities: [],
      imageUrl: "",
      comparisonId: null,
      pollingInterval: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },
  watch: {
    graph1_id: "startComparison",
    graph2_id: "startComparison",
  },
  async created() {
    this.startComparison();
  },
  beforeUnmount() {
    clearInterval(this.pollingInterval);
  },
  methods: {
    async startComparison() {
      this.nodeQuantities = [];
      this.imageUrl = "";
      clearInterval(this.pollingInterval);

      this.showSnackbar("Iniciando processamento da comparação...", "info");

      try {
        const payload = {
          idtask_grafo1: this.graph1_id,
          idtask_grafo2: this.graph2_id,
        };

        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await fetch(`${baseUrl}/runcomparison`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 202) {
          const data = await response.json();
          this.comparisonId = data.comparison_id;

          this.showSnackbar(
            "Processando... Isso pode levar alguns segundos.",
            "info"
          );
          this.pollingInterval = setInterval(this.fetchResult, 3000);
        } else {
          const errorData = await response.json();
          throw new Error(
            `Erro inesperado: ${errorData.erro || response.statusText}`
          );
        }
      } catch (error) {
        this.showSnackbar("Erro ao iniciar o processamento.", "error");
        console.error("Erro ao iniciar a comparação:", error);
      }
    },
    async fetchResult() {
      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await fetch(
          `${baseUrl}getcomparison/${this.comparisonId}`
        );

        if (response.ok) {
          // Verifica se a resposta HTTP é 200-299
          const data = await response.json();
          const result = data.result;

          if (
            result &&
            (result.status === "SUCCESS" || result.status === "success")
          ) {
            clearInterval(this.pollingInterval);
            this.processResultData(result);
            this.showSnackbar("Comparação concluída com sucesso!", "success");
          } else if (result && result.status === "FAILED") {
            clearInterval(this.pollingInterval);
            this.showSnackbar("O processamento da comparação falhou.", "error");
          } else {
            // Se a resposta está OK, mas o status ainda não é FINAL
            // O polling continua normalmente
            console.log("Processo em andamento...", result);
          }
        } else {
          // Se a resposta não foi OK (e.g., 404, 500)
          const errorData = await response.json();
          throw new Error(
            `Erro na resposta do servidor: ${response.status} - ${errorData.erro}`
          );
        }
      } catch (error) {
        clearInterval(this.pollingInterval);
        this.showSnackbar(
          "Erro ao buscar os resultados da comparação.",
          "error"
        );
        console.error("Erro ao buscar resultado:", error);
      }
    },
    processResultData(result) {
      this.nodeQuantities = result.node_categorization.map(categoryObj => {
        const [key] = Object.keys(categoryObj);
        const count = categoryObj[key].length;
        const formattedName = this.formatCategoryName(key);
        return { name: formattedName, count: count };
      });

      console.log("nome do arquivo: ", result.image_url);
      const filename = result.image_url.split("/").pop();
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      this.imageUrl = `${baseUrl}static/${filename}`;
      console.log("link da imagem: ", this.imageUrl);
    },
    formatCategoryName(name) {
      if (name === "unique_graph_1") return "Nós Únicos - Grafo 1";
      if (name === "unique_graph_2") return "Nós Únicos - Grafo 2";
      if (name === "common_nodes") return "Nós em Comum";
      return name;
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.v-card-title {
  color: #1a73e8;
}

.text-h4 {
  color: #333;
}
</style>
