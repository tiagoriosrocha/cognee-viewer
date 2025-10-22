<!-- Painel de processamento com Cognee -->
<!-- Este componente permite processar perguntas usando diferentes tipos de processamento -->

<template>
  <v-card class="pa-4" outlined>
    <v-card-title class="text-h6 font-weight-medium">
      <v-icon class="mr-2">mdi-cog</v-icon>
      Processar com Cognee
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" md="10">
          <v-combobox
            label="Selecione o Tipo de Processamento"
            :items="processingOptions"
            item-title="text"
            item-value="value"
            v-model="selectedProcessingType"
            variant="outlined"
            density="compact"
            hide-details
            :disabled="!selectedItem"
            hint="Escolha como você quer processar a pergunta"
            persistent-hint
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            color="primary"
            block
            size="large"
            :disabled="!selectedProcessingType || !selectedItem"
            :loading="processing"
            @click="processar"
          >
            <v-icon class="mr-2">mdi-play</v-icon>
            Executar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-row v-if="processedAnswer">
    <v-col cols="12">
      <v-card class="pa-4 mt-2" outlined>
        <v-card-title class="text-h6 font-weight-medium">
          Resposta Final:
        </v-card-title>
        <v-card-text class="card-text-scroll-answer">{{
          processedAnswer
        }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="processedAnswer">
    <v-col cols="12" md="8" v-if="selectedNode">
      <v-card class="pa-4 min-h-600" outlined>
        <v-card-title class="text-h6 font-weight-medium">
          Grafo do Processamento Cognee
        </v-card-title>
        <v-card-text class="d-flex align-center justify-center fill-height">
          <GraphViewer
            :nodes="graphData.nodes"
            :edges="graphData.edges"
            @node-selected="onNodeSelected"
          ></GraphViewer>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="12" v-else>
      <v-card class="pa-4 min-h-600" outlined>
        <v-card-title class="text-h6 font-weight-medium">
          Grafo do Processamento Cognee
        </v-card-title>
        <v-card-text class="d-flex align-center justify-center fill-height">
          <GraphViewer
            :nodes="graphData.nodes"
            :edges="graphData.edges"
            @node-selected="onNodeSelected"
          ></GraphViewer>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" v-if="selectedNode">
      <v-card class="pa-4 fill-height" outlined>
        <v-card-title class="text-h6 font-weight-medium">
          Detalhes do Nodo
        </v-card-title>
        <v-card-text>
          <div v-if="selectedNode">
            <v-list dense>
              <v-list-item v-for="(value, key) in selectedNode" :key="key">
                <v-list-item-title
                  ><strong>{{ key }}:</strong></v-list-item-title
                >
                <v-list-item-subtitle class="wrap-text">{{
                  typeof value === "object" ? JSON.stringify(value) : value
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
          <p v-else class="text-medium-emphasis">
            Selecione um nó do grafo para ver os detalhes.
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-divider v-if="processedAnswer" class="my-6"></v-divider>

  <GraphMetrics v-if="processedAnswer" :metrics="analise ?? undefined" />

  <v-divider v-if="processedAnswer" class="my-6"></v-divider>

  <v-row v-if="processedAnswer">
    <v-col cols="12">
      <v-card class="pa-4" outlined>
        <v-card-title class="text-h6 font-weight-medium d-flex align-center">
          Detalhes das Propriedades do Grafo
          <v-spacer></v-spacer>
          <!-- Botão de minimizar -->
          <v-btn icon @click="cardMinimized = !cardMinimized" size="small">
            <v-icon>
              {{ cardMinimized ? "mdi-chevron-down" : "mdi-chevron-up" }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-expand-transition>
          <v-card-text
            class="card-text-scroll-nodes-list"
            v-show="!cardMinimized"
          >
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">ID do Nó</th>
                  <th class="text-left">Nome do Nó</th>
                  <th class="text-left">Outras Propriedades</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(node, key) in graphData.nodes"
                  :key="node.id"
                  :class="{
                    'selected-row': selectedNode && selectedNode.id === node.id,
                  }"
                >
                  <td>{{ key }}</td>
                  <td>{{ node.name }}</td>
                  <td>
                    <div v-for="(value, prop) in node" :key="prop">
                      <span v-if="prop !== 'name' && prop !== 'id'">
                        <strong>{{ prop }}:</strong>
                        {{
                          typeof value === "object"
                            ? JSON.stringify(value)
                            : value
                        }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    :color="snackbarColor"
    location="bottom"
  >
    <div class="d-flex align-center w-100">
      <span>{{ snackbarMessage }}</span>
      <v-spacer></v-spacer>
      <v-icon color="white">fa-solid fa-check</v-icon>
    </div>
  </v-snackbar>

  <v-snackbar
    v-model="processingSnackbar"
    color="info"
    location="bottom"
    :timeout="-1"
  >
    Processando a requisição, por favor aguarde... ({{ elapsed }}s)
    <v-progress-circular
      indeterminate
      color="white"
      class="ml-4"
      size="20"
    ></v-progress-circular>
  </v-snackbar>
</template>

<script>
// Importar os componentes necessários
import GraphViewer from "./GraphViewer.vue";
import GraphMetrics from "./GraphMetrics.vue";

export default {
  name: "ProcessingDashboard",

  // Registrar os componentes filhos
  components: {
    GraphViewer,
    GraphMetrics,
  },

  // Props recebidas do componente pai
  props: {
    // Item (pergunta) selecionado para processamento
    selectedItem: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
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

      // Controla se o card de detalhes está minimizado
      cardMinimized: false,

      // Configurações do snackbar de notificação
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",

      // Configurações do snackbar de processamento
      processingSnackbar: false,
      elapsed: 0,
      timer: null,

      // Intervalo para verificar o status do processamento
      pollingInterval: null,

      // Dados do grafo gerado pelo processamento
      graphData: {
        nodes: {},
        edges: {},
      },

      // Análise dos dados processados
      analise: null,

      // Nó selecionado no grafo
      selectedNode: null,
    };
  },
  computed: {},
  mounted() {
    //if (this.processingOptions.length > 0) {
    //  this.selectedProcessingType = this.processingOptions[0].value;
    //}
  },
  methods: {
    /**
     * Método principal para processar uma pergunta
     * Este método inicia o processamento no servidor e monitora o progresso
     */
    async processar() {
      // Verificar se há uma pergunta e tipo de processamento selecionados
      if (!this.selectedItem || this.selectedProcessingType === null) {
        this.showSnackbar(
          "Por favor, selecione uma pergunta e um tipo de processamento.",
          "error"
        );
        return;
      }

      // Limpar qualquer polling anterior que esteja rodando
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }

      // Mostrar notificação de processamento
      this.showSnackbarProcessando();

      // Preparar os dados para enviar ao servidor
      const payload = {
        selectedQuestion: this.selectedItem,
        processingType: this.selectedProcessingType,
      };

      try {
        // 1. FAZER A REQUISIÇÃO PARA INICIAR O PROCESSO NO SERVIDOR
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await fetch(`${baseUrl}/runquestion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Verificar se o servidor aceitou a requisição (status 202)
        if (response.status !== 202) {
          const errorData = await response.json();
          throw new Error(
            `Erro ao iniciar a tarefa: ${errorData.erro || response.statusText}`
          );
        }

        // Obter o ID da tarefa criada no servidor
        const { task_id } = await response.json();

        // 2. INICIAR O MONITORAMENTO DO STATUS DA TAREFA
        this.taskId = task_id;
        this.iniciarPolling(task_id);
      } catch (error) {
        this.showSnackbar(
          "Ocorreu um erro ao iniciar o processamento.",
          "error"
        );
        console.error("Erro na requisição inicial:", error);
        this.hideSnackbarProcessando();
      }
    },

    /**
     * Método para iniciar o monitoramento do status da tarefa
     * Este método verifica periodicamente se a tarefa foi concluída
     * @param {string} taskId - ID da tarefa no servidor
     */
    iniciarPolling(taskId) {
      // Verificar o status a cada 5 segundos
      this.pollingInterval = setInterval(async () => {
        try {
          const baseUrl = process.env.VUE_APP_API_BASE_URL;
          const response = await fetch(`${baseUrl}/status/${taskId}`);

          // Verificar se a requisição foi bem-sucedida
          if (!response.ok) {
            throw new Error(`Erro ao verificar status: ${response.statusText}`);
          }

          const data = await response.json();

          // Verificar o status retornado pela API
          if (data.status === "SUCCESS") {
            // Tarefa concluída com sucesso
            this.finalizarPollingComSucesso(data.result);
          } else if (data.status === "FAILURE") {
            // Tarefa falhou
            this.finalizarPollingComErro(data.result);
          }
          // Se for 'PENDING' ou 'PROCESSING', continua verificando
        } catch (error) {
          // Se houver erro na verificação, para o polling
          this.finalizarPollingComErro({ detalhes: error.message });
        }
      }, 5000);
    },

    /**
     * Método chamado quando o processamento é concluído com sucesso
     * Este método atualiza a interface com os resultados obtidos
     * @param {Object} resultado - Resultado do processamento do servidor
     */
    finalizarPollingComSucesso(resultado) {
      // Parar o monitoramento
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;

      console.log("Resultado do servidor:", resultado);

      // Atualizar os dados da aplicação com o resultado
      this.processedAnswer = resultado.final_answer;
      this.graphData.nodes = resultado.nodes;
      this.graphData.edges = resultado.edges;
      this.analise = resultado.analise;

      console.log("Resultado da análise:", this.analise);

      // Emitir evento para o componente pai com o ID do grafo
      this.$emit("graph_id", this.taskId);

      // Esconder notificação de processamento e mostrar sucesso
      this.hideSnackbarProcessando();
      this.showSnackbar("Processamento concluído com sucesso!", "success");
      console.log("Resposta final da API:", resultado);
    },

    /**
     * Método chamado quando o processamento falha
     * Este método exibe uma mensagem de erro para o usuário
     * @param {Object} erro - Detalhes do erro ocorrido
     */
    finalizarPollingComErro(erro) {
      // Parar o monitoramento
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;

      // Esconder notificação de processamento e mostrar erro
      this.hideSnackbarProcessando();
      this.showSnackbar(
        "Ocorreu um erro no processamento do servidor.",
        "error"
      );
      console.error("Erro retornado pelo backend:", erro.detalhes);
    },
    /**
     * Método chamado quando um nó do grafo é selecionado
     * Este método atualiza a interface para mostrar os detalhes do nó
     * @param {Object} node - Nó selecionado no grafo
     */
    onNodeSelected(node) {
      if (!node) {
        this.selectedNode = null;
        return;
      }
      this.selectedNode = node;
      console.log("Nó selecionado:", node.id);
    },

    /**
     * Método para mostrar uma notificação (snackbar)
     * @param {string} message - Mensagem a ser exibida
     * @param {string} color - Cor da notificação
     */
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    /**
     * Método para mostrar notificação de processamento
     * Este método inicia um timer para mostrar o tempo decorrido
     */
    showSnackbarProcessando() {
      this.processingSnackbar = true;
      this.elapsed = 0;

      // Iniciar timer para contar os segundos
      this.timer = setInterval(() => {
        this.elapsed++;
      }, 1000);
      console.log("Mostrando notificação de processamento");
    },

    /**
     * Método para esconder notificação de processamento
     * Este método para o timer e esconde a notificação
     */
    hideSnackbarProcessando() {
      this.processingSnackbar = false;
      clearInterval(this.timer);
      this.timer = null;
      console.log("Escondendo notificação de processamento");
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.max-h-150 {
  max-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.min-h-600 {
  min-height: 600px;
}
.wrap-text {
  white-space: normal !important;
}
.context-wrapper,
.subquestions-wrapper {
  white-space: normal;
  overflow: visible;
  margin-top: 8px;
}
.context-list,
.subquestions-list {
  list-style-type: none;
  padding-left: 0;
}
.context-list li,
.subquestions-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}
.selected-row {
  background-color: #e0e0e0; /* cinza claro */
}
.card-text-scroll-answer {
  max-height: 120px; /* altura máxima do card-text */
  min-height: 120px;
  overflow-y: auto; /* adiciona a barra de rolagem vertical se necessário */
  white-space: pre-wrap; /* mantém quebras de linha do texto */
}
.card-text-scroll-nodes-list {
  max-height: 600px; /* altura máxima do card-text */
  overflow-y: auto; /* adiciona a barra de rolagem vertical se necessário */
  white-space: pre-wrap; /* mantém quebras de linha do texto */
}
</style>
