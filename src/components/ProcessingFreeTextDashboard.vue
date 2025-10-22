<!-- Painel de processamento de texto livre com Cognee -->
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

    <!-- Tabela de propriedades do grafo -->
    <v-row v-if="processedAnswer">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-medium d-flex align-center">
            <v-icon class="mr-2">mdi-table</v-icon>
            Detalhes das Propriedades do Grafo
            <v-spacer />
            <v-btn
              icon
              @click="cardMinimized = !cardMinimized"
              size="small"
              title="Minimizar/Expandir"
            >
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

      // Limpar qualquer polling anterior que esteja rodando
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }

      // Mostrar notificação de processamento
      this.showSnackbarProcessando();

      // Preparar os dados para enviar ao servidor
      const payload = {
        selectedQuestion: {
          question: this.formData.question,
          context: this.formData.context ? [["Contexto", [this.formData.context]]] : [],
          answer: "", // Será preenchido pelo servidor
          no_of_hops: 0,
          reasoning_type: "free_text",
          _id: `free_text_${Date.now()}`,
        },
        processingType: this.selectedProcessingType,
      };

      try {
        // 1. FAZER A REQUISIÇÃO PARA INICIAR O PROCESSO NO SERVIDOR
        const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";
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
          const baseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";
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

    /**
     * Método para limpar o formulário
     */
    clearForm() {
      this.formData.question = "";
      this.formData.context = "";
      this.selectedProcessingType = null;
      this.processedAnswer = null;
      this.graphData = { nodes: {}, edges: {} };
      this.analise = null;
      this.selectedNode = null;
    },
  },

  // Limpar timers quando o componente for destruído
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  },
};
</script>

<style scoped>
/* Estilos específicos do componente */
.min-h-600 {
  min-height: 600px;
}

.wrap-text {
  white-space: normal !important;
  word-wrap: break-word;
}

.selected-row {
  background-color: #e0e0e0;
}

.card-text-scroll-answer {
  max-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.card-text-scroll-nodes-list {
  max-height: 600px;
  overflow-y: auto;
  white-space: pre-wrap;
}

/* Estilos para o formulário */
.v-form {
  width: 100%;
}

/* Estilos para os cards */
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
