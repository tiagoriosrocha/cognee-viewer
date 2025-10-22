<!-- Rodapé da aplicação -->
<!-- Este componente fica sempre visível na parte inferior da página -->

<template>
  <v-footer app color="blue-grey-darken-4" dark class="pa-4">
    <v-container>
      <v-row align="center">
        <!-- Informações de copyright -->
        <v-col cols="12" md="6" class="text-center text-md-left">
          <span class="text-body-2">
            &copy; {{ currentYear }} Cognee - MorehopeQA
          </span>
        </v-col>

        <!-- Links úteis -->
        <v-col cols="12" md="6" class="text-center text-md-right">
          <v-btn
            variant="text"
            size="small"
            color="white"
            @click="openAbout"
            class="mr-2"
          >
            Sobre
          </v-btn>

          <v-btn
            variant="text"
            size="small"
            color="white"
            @click="openHelp"
            class="mr-2"
          >
            Ajuda
          </v-btn>

          <v-btn variant="text" size="small" color="white" @click="openContact">
            Contato
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",

  computed: {
    // Computed para obter o ano atual
    currentYear() {
      return new Date().getFullYear();
    },
  },

  methods: {
    // Método para abrir informações sobre o projeto
    openAbout() {
      // TODO: Implementar modal ou página sobre o projeto
      console.log("Abrir informações sobre o projeto");
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
    },

    // Método para abrir informações de contato
    openContact() {
      // TODO: Implementar página de contato
      console.log("Abrir informações de contato");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do rodapé */
.v-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
