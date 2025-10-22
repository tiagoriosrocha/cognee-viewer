<!-- Sistema de notificações da aplicação -->
<!-- Este componente gerencia todas as notificações (snackbars) da aplicação -->

<template>
  <div>
    <!-- Snackbar principal para notificações gerais -->
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      location="bottom"
      :multi-line="snackbar.multiLine"
    >
      <div class="d-flex align-center">
        <!-- Ícone da notificação -->
        <v-icon v-if="snackbar.icon" class="mr-2">
          {{ snackbar.icon }}
        </v-icon>

        <!-- Mensagem da notificação -->
        <span>{{ snackbar.message }}</span>

        <!-- Botão de fechar -->
        <v-spacer />
        <v-btn icon size="small" @click="closeSnackbar">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-snackbar>

    <!-- Snackbar para notificações de processamento -->
    <v-snackbar
      v-model="processingSnackbar.visible"
      color="info"
      location="bottom"
      :timeout="-1"
    >
      <div class="d-flex align-center">
        <v-progress-circular
          indeterminate
          color="white"
          size="20"
          class="mr-3"
        />
        <span
          >{{ processingSnackbar.message }} ({{
            processingSnackbar.elapsed
          }}s)</span
        >
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "NotificationSystem",

  data() {
    return {
      // Configuração do snackbar principal
      snackbar: {
        visible: false,
        message: "",
        color: "info",
        timeout: 3000,
        icon: null,
        multiLine: false,
      },

      // Configuração do snackbar de processamento
      processingSnackbar: {
        visible: false,
        message: "Processando...",
        elapsed: 0,
      },

      // Timer para contagem de tempo de processamento
      processingTimer: null,
    };
  },

  methods: {
    // Método para mostrar uma notificação
    showNotification(message, color = "info", options = {}) {
      this.snackbar = {
        visible: true,
        message,
        color,
        timeout: options.timeout || 3000,
        icon: options.icon || null,
        multiLine: options.multiLine || false,
      };
    },

    // Método para fechar a notificação
    closeSnackbar() {
      this.snackbar.visible = false;
    },

    // Método para mostrar notificação de processamento
    showProcessingNotification(message = "Processando...") {
      this.processingSnackbar = {
        visible: true,
        message,
        elapsed: 0,
      };

      // Iniciar timer para contagem de tempo
      this.processingTimer = setInterval(() => {
        this.processingSnackbar.elapsed++;
      }, 1000);
    },

    // Método para esconder notificação de processamento
    hideProcessingNotification() {
      this.processingSnackbar.visible = false;

      // Limpar timer
      if (this.processingTimer) {
        clearInterval(this.processingTimer);
        this.processingTimer = null;
      }
    },

    // Método para mostrar notificação de sucesso
    showSuccess(message) {
      this.showNotification(message, "success", {
        icon: "mdi-check-circle",
      });
    },

    // Método para mostrar notificação de erro
    showError(message) {
      this.showNotification(message, "error", {
        icon: "mdi-alert-circle",
        timeout: 5000,
      });
    },

    // Método para mostrar notificação de aviso
    showWarning(message) {
      this.showNotification(message, "warning", {
        icon: "mdi-alert",
      });
    },

    // Método para mostrar notificação de informação
    showInfo(message) {
      this.showNotification(message, "info", {
        icon: "mdi-information",
      });
    },
  },

  // Limpar timer quando o componente for destruído
  beforeUnmount() {
    if (this.processingTimer) {
      clearInterval(this.processingTimer);
    }
  },
};
</script>

<style scoped>
/* Estilos específicos do sistema de notificações */
.v-snackbar {
  z-index: 9999;
}
</style>
