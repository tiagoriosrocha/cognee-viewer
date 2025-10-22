<!-- Barra de navegação superior da aplicação -->
<!-- Este componente fica sempre visível no topo da página -->

<template>
  <v-app-bar :elevation="10" color="primary" dark>
    <!-- Botão do menu hambúrguer (apenas em telas pequenas) -->
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="d-md-none" />

    <!-- Logo e título da aplicação -->
    <v-app-bar-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-brain</v-icon>
      Cognee - MorehopeQA
    </v-app-bar-title>

    <!-- Espaçador para empurrar os botões para a direita -->
    <v-spacer />

    <!-- Botões de ação na barra superior -->
    <v-btn icon="mdi-magnify" @click="toggleSearch" title="Pesquisar" />

    <v-btn icon="mdi-cog" @click="openSettings" title="Configurações" />

    <v-btn icon="mdi-help-circle" @click="openHelp" title="Ajuda" />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",

  emits: ["toggle-drawer"],

  methods: {
    // Método para alternar a busca
    toggleSearch() {
      // TODO: Implementar funcionalidade de busca
      console.log("Abrir/fechar busca");
    },

    // Método para abrir configurações
    openSettings() {
      // TODO: Implementar página de configurações
      console.log("Abrir configurações");
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da barra de navegação */
.v-app-bar-title {
  font-weight: 600;
}
</style>
