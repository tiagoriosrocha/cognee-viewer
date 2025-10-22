<!-- Menu lateral de navegação -->
<!-- Este componente contém os links para as diferentes páginas da aplicação -->

<template>
  <v-navigation-drawer
    v-model="isOpen"
    temporary
    location="left"
    color="grey-lighten-5"
  >
    <!-- Cabeçalho do menu lateral -->
    <v-list-item class="pa-4">
      <v-list-item-title class="text-h6 font-weight-bold">
        Navegação
      </v-list-item-title>
    </v-list-item>

    <v-divider />

    <!-- Lista de itens do menu -->
    <v-list density="compact" nav>
      <!-- Item: Página Inicial -->
      <v-list-item
        prepend-icon="mdi-home"
        title="Página Inicial"
        value="home"
        :to="{ name: 'home' }"
        @click="closeDrawer"
      />

      <!-- Item: Dashboard -->
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        :to="{ name: 'dashboard' }"
        @click="closeDrawer"
      />

      <!-- Item: Processamento de Texto Livre -->
      <v-list-item
        prepend-icon="mdi-text-box-plus"
        title="Texto Livre"
        value="free-text"
        :to="{ name: 'free-text' }"
        @click="closeDrawer"
      />

      <!-- Item: Comparação de Grafos -->
      <v-list-item
        prepend-icon="mdi-graph"
        title="Comparar Grafos"
        value="compare"
        :to="{ name: 'compare' }"
        @click="closeDrawer"
      />

      <v-divider class="my-2" />

      <!-- Seção de informações -->
      <v-list-item class="pa-2">
        <v-list-item-title class="text-caption text-grey">
          Informações
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-information"
        title="Sobre o Projeto"
        value="about"
        @click="openAbout"
      />

      <v-list-item
        prepend-icon="mdi-help"
        title="Ajuda"
        value="help"
        @click="openHelp"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",

  props: {
    // Prop para controlar se o menu está aberto
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  computed: {
    // Computed para sincronizar com o v-model
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    // Método para fechar o menu lateral
    closeDrawer() {
      this.isOpen = false;
    },

    // Método para abrir informações sobre o projeto
    openAbout() {
      // TODO: Implementar modal ou página sobre o projeto
      console.log("Abrir informações sobre o projeto");
      this.closeDrawer();
    },

    // Método para abrir ajuda
    openHelp() {
      // TODO: Implementar página de ajuda
      console.log("Abrir ajuda");
      this.closeDrawer();
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do menu lateral */
.v-list-item {
  border-radius: 8px;
  margin: 2px 8px;
}

.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>
