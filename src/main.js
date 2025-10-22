// Arquivo principal da aplicação Vue
// Este arquivo configura e inicializa a aplicação

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

// Importar biblioteca de visualização de grafos
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

// Carregar fontes
loadFonts();

// Criar e configurar a aplicação Vue
const app = createApp(App);

// Registrar plugins e bibliotecas
app.use(store); // Vuex para gerenciamento de estado
app.use(router); // Vue Router para navegação
app.use(VNetworkGraph); // Biblioteca para visualização de grafos
app.use(vuetify); // Vuetify para componentes de UI

// Montar a aplicação no elemento #app
app.mount("#app");
