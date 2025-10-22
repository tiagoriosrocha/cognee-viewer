// Configurações da API
// Este arquivo contém as configurações para comunicação com o servidor

// URL base da API (pode ser alterada para diferentes ambientes)
export const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:5001";

// Endpoints da API
export const API_ENDPOINTS = {
  // Endpoint para processar perguntas
  RUN_QUESTION: "/runquestion",

  // Endpoint para verificar status de uma tarefa
  STATUS: "/status",

  // Endpoint para executar comparação de grafos
  RUN_COMPARISON: "/runcomparison",

  // Endpoint para obter resultado de comparação
  GET_COMPARISON: "/getcomparison",

  // Endpoint para arquivos estáticos
  STATIC: "/static",
};

// Configurações de timeout para requisições
export const REQUEST_TIMEOUT = 30000; // 30 segundos

// Configurações de polling (verificação de status)
export const POLLING_INTERVAL = 5000; // 5 segundos
export const MAX_POLLING_ATTEMPTS = 60; // Máximo de tentativas (5 minutos)

// Configurações de notificações
export const NOTIFICATION_TIMEOUT = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
};
