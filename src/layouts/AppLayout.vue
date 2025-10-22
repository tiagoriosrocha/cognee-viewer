<!-- Layout principal da aplicação -->
<!-- Este componente define a estrutura base que será usada em todas as páginas -->

<template>
  <v-app>
    <!-- Barra de navegação superior -->
    <AppBar />

    <!-- Menu lateral de navegação -->
    <NavigationDrawer v-model="drawer" />

    <!-- Conteúdo principal da aplicação -->
    <v-main>
      <!-- Aqui será renderizado o conteúdo de cada página -->
      <router-view />
    </v-main>

    <!-- Rodapé da aplicação -->
    <AppFooter />

    <!-- Sistema de notificações (snackbars) -->
    <NotificationSystem />
  </v-app>
</template>

<script>
// Importar os componentes de layout
import AppBar from "../components/layout/AppBar.vue";
import NavigationDrawer from "../components/layout/NavigationDrawer.vue";
import AppFooter from "../components/layout/AppFooter.vue";
import NotificationSystem from "../components/layout/NotificationSystem.vue";

export default {
  name: "AppLayout",

  // Registrar os componentes de layout
  components: {
    AppBar,
    NavigationDrawer,
    AppFooter,
    NotificationSystem,
  },

  data() {
    return {
      // Controla se o menu lateral está aberto ou fechado
      drawer: false,
    };
  },

  methods: {
    // Método para alternar o menu lateral
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do layout principal */
.v-main {
  min-height: 100vh;
}
</style>
