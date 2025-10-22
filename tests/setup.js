// Configuração global para testes
// Este arquivo configura o ambiente de testes

import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Configurar Vuetify para testes
const vuetify = createVuetify({
  components,
  directives,
})

// Configurar globalmente para todos os testes
config.global.plugins = [vuetify]

// Mock do console para evitar warnings nos testes
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock do ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
