// Composable para gerenciar notificações
// Este composable fornece métodos para mostrar diferentes tipos de notificações

import { ref } from "vue";

// Estado global das notificações
const snackbar = ref({
  visible: false,
  message: "",
  color: "info",
  timeout: 3000,
  icon: null,
  multiLine: false,
});

const processingSnackbar = ref({
  visible: false,
  message: "Processando...",
  elapsed: 0,
});

let processingTimer = null;

/**
 * Composable para gerenciar notificações
 * @returns {Object} Objeto com métodos para controlar notificações
 */
export function useNotifications() {
  /**
   * Método para mostrar uma notificação
   * @param {string} message - Mensagem a ser exibida
   * @param {string} color - Cor da notificação (success, error, warning, info)
   * @param {Object} options - Opções adicionais
   */
  const showNotification = (message, color = "info", options = {}) => {
    snackbar.value = {
      visible: true,
      message,
      color,
      timeout: options.timeout || 3000,
      icon: options.icon || null,
      multiLine: options.multiLine || false,
    };
  };

  /**
   * Método para fechar a notificação atual
   */
  const closeNotification = () => {
    snackbar.value.visible = false;
  };

  /**
   * Método para mostrar notificação de sucesso
   * @param {string} message - Mensagem de sucesso
   */
  const showSuccess = (message) => {
    showNotification(message, "success", {
      icon: "mdi-check-circle",
    });
  };

  /**
   * Método para mostrar notificação de erro
   * @param {string} message - Mensagem de erro
   */
  const showError = (message) => {
    showNotification(message, "error", {
      icon: "mdi-alert-circle",
      timeout: 5000,
    });
  };

  /**
   * Método para mostrar notificação de aviso
   * @param {string} message - Mensagem de aviso
   */
  const showWarning = (message) => {
    showNotification(message, "warning", {
      icon: "mdi-alert",
    });
  };

  /**
   * Método para mostrar notificação de informação
   * @param {string} message - Mensagem informativa
   */
  const showInfo = (message) => {
    showNotification(message, "info", {
      icon: "mdi-information",
    });
  };

  /**
   * Método para mostrar notificação de processamento
   * @param {string} message - Mensagem de processamento
   */
  const showProcessing = (message = "Processando...") => {
    processingSnackbar.value = {
      visible: true,
      message,
      elapsed: 0,
    };

    // Iniciar timer para contagem de tempo
    processingTimer = setInterval(() => {
      processingSnackbar.value.elapsed++;
    }, 1000);
  };

  /**
   * Método para esconder notificação de processamento
   */
  const hideProcessing = () => {
    processingSnackbar.value.visible = false;

    // Limpar timer
    if (processingTimer) {
      clearInterval(processingTimer);
      processingTimer = null;
    }
  };

  return {
    // Estado das notificações
    snackbar,
    processingSnackbar,

    // Métodos para controlar notificações
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showProcessing,
    hideProcessing,
  };
}
