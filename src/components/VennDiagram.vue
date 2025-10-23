<template>
  <v-card class="pa-4 mb-4" outlined>
    <v-card-title class="text-h6 font-weight-medium">
      Comparação de Grafos
    </v-card-title>
  </v-card>

  <div
    v-if="loading"
    class="text-center d-flex flex-column align-center justify-center"
    style="min-height: 450px"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
    <p class="mt-4 text-medium-emphasis">Buscando e comparando grafos...</p>
  </div>

  <div v-else>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="text-subtitle-1">
            Nós Únicos - Grafo 1
          </v-card-title>
          <v-card-text class="text-h4 text-center pa-4">
            {{ nodesOnlyA }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="text-subtitle-1"> Nós em Comum </v-card-title>
          <v-card-text class="text-h4 text-center pa-4">
            {{ nodesIntersection }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title class="text-subtitle-1">
            Nós Únicos - Grafo 2
          </v-card-title>
          <v-card-text class="text-h4 text-center pa-4">
            {{ nodesOnlyB }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6"> Diagrama de Venn </v-card-title>
          <v-card-text
            class="d-flex align-center justify-center"
            style="min-height: 450px"
          >
            <div
              v-if="
                !setsData ||
                setsData.length === 0 ||
                (nodesOnlyA === 0 &&
                  nodesOnlyB === 0 &&
                  nodesIntersection === 0)
              "
              class="text-medium-emphasis"
            >
              Não há dados para comparar. (Ambos os grafos podem ser vazios ou
              idênticos).
            </div>
            <div v-else ref="vennContainer" id="venn-container"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <div ref="tooltip" class="venntooltip"></div>
</template>

<script setup>
// Importa nextTick
import { ref, watch, defineProps, onMounted, nextTick } from "vue";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";

// --- LOG INICIAL ---
console.log("[VENN DEBUG] Componente VennDiagram foi inicializado.");

// --- Props ---
const props = defineProps({
  graph1_id: {
    type: String,
    required: true,
  },
  graph2_id: {
    type: String,
    required: true,
  },
});

// --- Refs do DOM ---
const vennContainer = ref(null);
const tooltip = ref(null);

// --- Estado Reativo ---
const loading = ref(true);
const setsData = ref([]);
const baseUrl = process.env.VUE_APP_API_BASE_URL;

// --- NOVAS VARIÁVEIS REATIVAS PARA OS CARDS ---
const nodesOnlyA = ref(0);
const nodesOnlyB = ref(0);
const nodesIntersection = ref(0);

// --- LOG URL DA API ---
console.log("[VENN DEBUG] URL Base da API:", baseUrl);

/**
 * Busca os dados de um grafo e retorna um Map<string, NodeObject>.
 * @param {string} graphId - O ID do grafo a ser buscado.
 * @returns {Promise<Map<string, object>>} Um Map onde a chave é o ID do nodo e o valor é o objeto do nodo.
 */
async function fetchGraphNodeIds(graphId) {
  if (!graphId) {
    console.warn(
      "[VENN DEBUG] fetchGraphNodeIds chamado com ID nulo ou vazio."
    );
    return new Map();
  }

  const url = `${baseUrl}status/${graphId}`;
  console.log(`[VENN DEBUG] Buscando Grafo ID: ${graphId} em ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status} ao buscar grafo ${graphId}`
      );
    }

    const data = await response.json();

    console.log(`[VENN DEBUG] Resposta recebida para ${graphId}:`, data);

    // Verificamos data.result.nodes
    if (
      data.result &&
      data.result.nodes &&
      typeof data.result.nodes === "object"
    ) {
      // Retorna um Map(ID, ObjetoDoNodo)
      const nodeMap = new Map(Object.entries(data.result.nodes));
      console.log(
        `[VENN DEBUG] Sucesso! Grafo ${graphId} tem ${nodeMap.size} nodos.`
      );
      return nodeMap;
    } else {
      console.warn(
        `[VENN DEBUG] Resposta para ${graphId} não continha 'data.result.nodes' ou não era um objeto.`
      );
      return new Map();
    }
  } catch (error) {
    console.error(
      `[VENN DEBUG] Falha ao buscar dados do grafo ${graphId}:`,
      error
    );
    return new Map();
  }
}

/**
 * Função principal para gerar os dados do diagrama.
 */
async function generateDiagramData() {
  console.log("[VENN DEBUG] generateDiagramData INICIADO.");
  if (!props.graph1_id || !props.graph2_id) {
    console.warn(
      "[VENN DEBUG] generateDiagramData interrompido: IDs dos grafos estão faltando."
    );
    loading.value = false;
    return;
  }

  loading.value = true;
  setsData.value = [];
  // Reseta as contagens
  nodesOnlyA.value = 0;
  nodesOnlyB.value = 0;
  nodesIntersection.value = 0;

  // Agora recebemos Maps (ID -> NodeObject)
  const [nodesMap1, nodesMap2] = await Promise.all([
    fetchGraphNodeIds(props.graph1_id),
    fetchGraphNodeIds(props.graph2_id),
  ]);

  // Extrai os IDs para a lógica de Set
  const ids1 = new Set(nodesMap1.keys());
  const ids2 = new Set(nodesMap2.keys());

  console.log("[VENN DEBUG] Set de IDs Grafo 1 (tamanho):", ids1.size);
  console.log("[VENN DEBUG] Set de IDs Grafo 2 (tamanho):", ids2.size);

  // Calcula as interseções (apenas com os IDs)
  console.log("[VENN DEBUG] Calculando interseções...");
  const intersectionIds = new Set([...ids1].filter(id => ids2.has(id)));
  const onlyA_Ids = new Set([...ids1].filter(id => !ids2.has(id)));
  const onlyB_Ids = new Set([...ids2].filter(id => !ids1.has(id)));

  // --- ATUALIZA AS VARIÁVEIS DOS CARDS ---
  nodesOnlyA.value = onlyA_Ids.size;
  nodesOnlyB.value = onlyB_Ids.size;
  nodesIntersection.value = intersectionIds.size;
  // ----------------------------------------

  console.log("[VENN DEBUG] Nodos Apenas no Grafo 1 (onlyA):", onlyA_Ids.size);
  console.log("[VENN DEBUG] Nodos Apenas no Grafo 2 (onlyB):", onlyB_Ids.size);
  console.log(
    "[VENN DEBUG] Nodos em Comum (intersection):",
    intersectionIds.size
  );

  // Helper para buscar o 'name' do nodo no Map, ou retornar o ID como fallback
  const getNodeName = (map, id) => {
    const node = map.get(id);
    // Retorna o 'name' se existir e não for vazio, senão retorna o ID
    //return node && node.name ? node.name : id;
    return node.id;
  };

  // Monta os dados finais para o Venn, agora mapeando IDs para Nomes
  const finalSets = [
    {
      sets: ["Grafo 1"],
      size: onlyA_Ids.size,
      nodes: [...onlyA_Ids].map(id => getNodeName(nodesMap1, id)),
      label: "Grafo 1", // Rótulo simplificado
    },
    {
      sets: ["Grafo 2"],
      size: onlyB_Ids.size,
      nodes: [...onlyB_Ids].map(id => getNodeName(nodesMap2, id)),
      label: "Grafo 2", // Rótulo simplificado
    },
    {
      sets: ["Grafo 1", "Grafo 2"],
      size: intersectionIds.size,
      nodes: [...intersectionIds].map(id => getNodeName(nodesMap1, id)), // Tanto faz map1 ou map2
      label: "Interseção", // Rótulo simplificado
    },
  ];

  console.log(
    "[VENN DEBUG] Dados finais para o Venn.js:",
    JSON.parse(JSON.stringify(finalSets))
  );

  setsData.value = finalSets;
  loading.value = false;
  console.log(
    "[VENN DEBUG] generateDiagramData CONCLUÍDO. Loading set to false."
  );
}

/**
 * Desenha o gráfico D3.
 */
function drawChart(data) {
  console.log(
    "[VENN DEBUG] drawChart CHAMADO com:",
    JSON.parse(JSON.stringify(data))
  );

  if (!data || data.length === 0) {
    console.warn("[VENN DEBUG] drawChart interrompido: dados vazios.");
    return;
  }
  if (!vennContainer.value) {
    // Este log agora só deve aparecer se nextTick falhar
    console.error(
      "[VENN DEBUG] drawChart interrompido: container do Venn (ref) é NULO."
    );
    return;
  }

  // --- LOG DO CONTAINER ---
  console.log(
    "[VENN DEBUG] Container do Venn (Elemento DOM):",
    vennContainer.value
  );

  const div = d3.select(vennContainer.value);
  const tooltipEl = d3.select(tooltip.value);

  div.selectAll("svg").remove();
  console.log("[VENN DEBUG] SVG anterior removido (se existia).");

  const chart = venn.VennDiagram().width(400).height(400);

  const g = div.datum(data).call(chart);
  console.log("[VENN DEBUG] venn.js .call(chart) executado.");

  // Anexa os listeners de tooltip
  g.selectAll("g")
    .on("mouseover", function (event, d) {
      let label = d.label || d.sets.join(" ∩ ");
      let content = `<strong>${label}</strong><br>`;
      content += `Tamanho (Nodos): ${d.size}<br><br>`;

      if (d.nodes && d.nodes.length) {
        const nodesToShow = d.nodes.slice(0, 20);
        content += "<strong>Nodos:</strong><br>" + nodesToShow.join("<br>");
        if (d.nodes.length > 20) {
          content += `<br>...e mais ${d.nodes.length - 20} outros.`;
        }
      } else {
        content += "<strong>Nodos:</strong> (Nenhum)";
      }

      tooltipEl.html(content);
      tooltipEl.style("display", "block").style("opacity", 1);
    })
    .on("mousemove", function (event) {
      tooltipEl.style("left", event.pageX + 15 + "px");
      tooltipEl.style("top", event.pageY - 10 + "px");
    })
    .on("mouseout", function () {
      tooltipEl.style("opacity", 0).style("display", "none");
    });

  console.log("[VENN DEBUG] Listeners de Tooltip anexados.");
}

// --- Watchers (Observadores) ---

// 1. Observa as 'props' (graph1_id, graph2_id).
watch(
  [() => props.graph1_id, () => props.graph2_id],
  (newIds, oldIds) => {
    // --- LOG DO WATCHER DE PROPS ---
    console.log("[VENN DEBUG] Watcher de Props ATIVADO.");
    console.log(
      "[VENN DEBUG] ID 1 (novo):",
      newIds[0],
      "| (antigo):",
      oldIds ? oldIds[0] : "N/A"
    );
    console.log(
      "[VENN DEBUG] ID 2 (novo):",
      newIds[1],
      "| (antigo):",
      oldIds ? oldIds[1] : "N/A"
    );

    if (newIds[0] && newIds[1]) {
      generateDiagramData();
    } else {
      console.warn("[VENN DEBUG] Watcher de Props: IDs não estão prontos.");
      setsData.value = []; // Limpa se os IDs desaparecerem
      loading.value = false;
      // Reseta contagens se IDs sumirem
      nodesOnlyA.value = 0;
      nodesOnlyB.value = 0;
      nodesIntersection.value = 0;
    }
  },
  { immediate: true } // Roda imediatamente
);

// 2. Observa a variável 'setsData'.
watch(setsData, newData => {
  // --- LOG DO WATCHER DE DADOS ---
  console.log(
    "[VENN DEBUG] Watcher de setsData ATIVADO. Novos dados (tamanho):",
    newData.length
  );

  if (loading.value) {
    console.log(
      "[VENN DEBUG] Watcher setsData: Ainda carregando, não vai desenhar agora."
    );
    return;
  }

  // Verifica se há dados E se os totais não são todos zero
  const hasDataToDraw =
    nodesOnlyA.value > 0 ||
    nodesOnlyB.value > 0 ||
    nodesIntersection.value > 0;

  if (newData && newData.length > 0 && hasDataToDraw) {
    // ------ USA O nextTick AQUI ------
    nextTick(() => {
      if (vennContainer.value) {
        console.log("[VENN DEBUG] nextTick: Container está pronto. Chamando drawChart.");
        drawChart(newData);
      } else {
        console.error(
          "[VENN DEBUG] nextTick: ERRO GRAVE! Container ref AINDA é nulo após nextTick."
        );
      }
    });
    // ---------------------------------
  } else if (!loading.value) {
    console.log(
      "[VENN DEBUG] Watcher setsData: Dados vazios ou zerados. Limpando SVG."
    );
    // Mesmo aqui, é mais seguro usar nextTick se o SVG foi removido
    nextTick(() => {
       if (vennContainer.value) { // Verifica se o container ainda existe
         d3.select(vennContainer.value).selectAll("svg").remove();
       }
    });
  }
});

onMounted(() => {
  // --- LOG DE MONTAGEM ---
  console.log("[VENN DEBUG] Componente VennDiagram MONTADO (onMounted).");
  console.log("[VENN DEBUG] Container ref no onMounted:", vennContainer.value);
});
</script>

<style>
/* Estilos (sem alterações) */
.venntooltip {
  position: absolute;
  text-align: left;
  padding: 8px 12px;
  font: 12px sans-serif;
  background: #222;
  color: white;
  border: 0px;
  border-radius: 8px;
  opacity: 0;
  display: none;
  pointer-events: none;
  z-index: 1000;
}
#venn-container svg {
  max-width: 100%;
  height: auto;
}
.venn-circle path {
  fill-opacity: 0.5;
  stroke-width: 2;
  stroke: #fff;
}
.venn-circle text {
  font-weight: bold;
  fill: #333;
}
</style>