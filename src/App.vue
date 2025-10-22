<!-- Componente raiz da aplicação -->
<!-- Este componente define a estrutura principal e usa o Vue Router -->

<template>
  <!-- Layout principal da aplicação -->
  <AppLayout />
</template>

<script>
// Importar o layout principal da aplicação
import AppLayout from "./layouts/AppLayout.vue";

export default {
  name: "App",

  // Registrar o componente de layout
  components: {
    AppLayout,
  },
};
</script>

<!-- Estilos globais da aplicação -->
<style>
/* Estilos globais podem ser adicionados aqui se necessário */
</style>
