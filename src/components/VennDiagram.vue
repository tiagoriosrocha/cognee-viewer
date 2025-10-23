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
            {{ nodesOnlyA }} <span class="text-h6">de {{ totalNodesGraph1 }}</span>
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
            {{ nodesOnlyB }} <span class="text-h6">de {{ totalNodesGraph2 }}</span>
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
                  nodesIntersection === 0 &&
                  totalNodesGraph1 === 0 &&
                  totalNodesGraph2 === 0)
              "
              class="text-medium-emphasis"
            >
              Não há dados para comparar ou os grafos não foram carregados.
            </div>
            <div v-else :ref="'vennContainer'" id="venn-container"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <div :ref="'tooltip'" class="venntooltip"></div>
</template>

<script>
// Importações ficam fora do export default
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";
// Import nextTick para garantir acesso ao DOM após atualização
import { nextTick } from 'vue';

export default {
  name: "VennDiagram", // Boa prática adicionar um nome ao componente
  props: {
    graph1_id: {
      type: String,
      required: true,
    },
    graph2_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      setsData: [],
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      nodesOnlyA: 0,
      nodesOnlyB: 0,
      nodesIntersection: 0,
      totalNodesGraph1: 0,
      totalNodesGraph2: 0,
    };
  },
  watch: {
    // Watchers movidos para a opção watch
    graph1_id: {
      handler: 'handleGraphIdChange', // Chama o método handleGraphIdChange
      immediate: true, // Roda imediatamente na montagem
    },
    graph2_id: {
      handler: 'handleGraphIdChange', // Chama o mesmo método
      immediate: true,
    },
    setsData(newData) {
      // console.log("[VENN DEBUG] Watcher de setsData ATIVADO. Novos dados (tamanho):", newData.length);

      if (this.loading) {
        // console.log("[VENN DEBUG] Watcher setsData: Ainda carregando, não vai desenhar agora.");
        return;
      }

      const hasDataToDraw =
        this.nodesOnlyA > 0 ||
        this.nodesOnlyB > 0 ||
        this.nodesIntersection > 0;

      if (newData && newData.length > 0 && hasDataToDraw) {
        // Usa nextTick para garantir que o DOM (especificamente o v-else) foi atualizado
        nextTick(() => {
          // Acessa refs com this.$refs
          if (this.$refs.vennContainer) {
            // console.log("[VENN DEBUG] nextTick: Container está pronto. Chamando drawChart.");
            this.drawChart(newData); // Chama o método drawChart
          } else {
            console.error(
              "[VENN DEBUG] nextTick: ERRO GRAVE! Container ref AINDA é nulo após nextTick."
            );
          }
        });
      } else if (!this.loading) {
        // console.log("[VENN DEBUG] Watcher setsData: Dados vazios ou zerados. Limpando SVG.");
        // Limpa o SVG se não houver dados
        nextTick(() => {
           // Acessa refs com this.$refs
           if (this.$refs.vennContainer) {
             d3.select(this.$refs.vennContainer).selectAll("svg").remove();
           }
        });
      }
    }
  },
  methods: {
    // Funções movidas para methods
    // Usar 'async' antes do nome da função
    // Acessar estado e props com 'this.'

    // Método chamado pelos watchers das props
    handleGraphIdChange() {
        // console.log("[VENN DEBUG] handleGraphIdChange chamado.");
        // console.log("[VENN DEBUG] ID 1:", this.graph1_id);
        // console.log("[VENN DEBUG] ID 2:", this.graph2_id);
        if (this.graph1_id && this.graph2_id) {
            this.generateDiagramData();
        } else {
            // console.warn("[VENN DEBUG] Watcher de Props: IDs não estão prontos.");
            this.setsData = [];
            this.loading = false;
            this.nodesOnlyA = 0;
            this.nodesOnlyB = 0;
            this.nodesIntersection = 0;
            this.totalNodesGraph1 = 0;
            this.totalNodesGraph2 = 0;
        }
    },

    async fetchGraphNodeData(graphId) {
      if (!graphId) {
        console.warn(
          "[VENN DEBUG] fetchGraphNodeData chamado com ID nulo ou vazio."
        );
        return new Map();
      }

      const url = `${this.baseUrl}status/${graphId}`; // Usa this.baseUrl
      // console.log(`[VENN DEBUG] Buscando Grafo ID: ${graphId} em ${url}`);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Erro HTTP ${response.status} ao buscar grafo ${graphId}`
          );
        }

        const data = await response.json();
        // console.log(`[VENN DEBUG] Resposta recebida para ${graphId}:`, data);

        if (
          data.result &&
          data.result.nodes &&
          typeof data.result.nodes === "object"
        ) {
          const nodeMap = new Map(Object.entries(data.result.nodes));
          // console.log(`[VENN DEBUG] Sucesso! Grafo ${graphId} tem ${nodeMap.size} nodos.`);
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
    },

    async generateDiagramData() {
      // console.log("[VENN DEBUG] generateDiagramData INICIADO.");
      // Acessa props com this.
      if (!this.graph1_id || !this.graph2_id) {
        console.warn(
          "[VENN DEBUG] generateDiagramData interrompido: IDs dos grafos estão faltando."
        );
        this.loading = false; // Usa this.loading
        return;
      }

      this.loading = true;
      this.setsData = []; 
      this.nodesOnlyA = 0;
      this.nodesOnlyB = 0;
      this.nodesIntersection = 0; 
      this.totalNodesGraph1 = 0;
      this.totalNodesGraph2 = 0;

      const [nodesMap1, nodesMap2] = await Promise.all([
        this.fetchGraphNodeData(this.graph1_id), 
        this.fetchGraphNodeData(this.graph2_id), 
      ]);

      this.totalNodesGraph1 = nodesMap1.size;
      this.totalNodesGraph2 = nodesMap2.size;

      const ids1 = new Set(nodesMap1.keys());
      const ids2 = new Set(nodesMap2.keys());

      // console.log("[VENN DEBUG] Set de IDs Grafo 1 (tamanho):", ids1.size);
      // console.log("[VENN DEBUG] Set de IDs Grafo 2 (tamanho):", ids2.size);

      const intersectionIds = new Set([...ids1].filter(id => ids2.has(id)));
      const onlyA_Ids = new Set([...ids1].filter(id => !ids2.has(id)));
      const onlyB_Ids = new Set([...ids2].filter(id => !ids1.has(id)));

      this.nodesOnlyA = onlyA_Ids.size; // Usa this.
      this.nodesOnlyB = onlyB_Ids.size; // Usa this.
      this.nodesIntersection = intersectionIds.size; // Usa this.

      // console.log("[VENN DEBUG] Nodos Apenas no Grafo 1 (onlyA):", this.nodesOnlyA);
      // console.log("[VENN DEBUG] Nodos Apenas no Grafo 2 (onlyB):", this.nodesOnlyB);
      // console.log("[VENN DEBUG] Nodos em Comum (intersection):", this.nodesIntersection);

      // getNodeName pode ser um método auxiliar ou permanecer interno
      const getNodeName = (map, id) => {
        const node = map.get(id);
        return node && node.name ? node.name : id;
      };

      const finalSets = [
        {
          sets: ["Grafo 1"],
          size: this.nodesOnlyA,
          nodes: [...onlyA_Ids].map(id => getNodeName(nodesMap1, id)),
          label: "Grafo 1",
        },
        {
          sets: ["Grafo 2"],
          size: this.nodesOnlyB,
          nodes: [...onlyB_Ids].map(id => getNodeName(nodesMap2, id)),
          label: "Grafo 2",
        },
        {
          sets: ["Grafo 1", "Grafo 2"],
          size: this.nodesIntersection,
          nodes: [...intersectionIds].map(id => getNodeName(nodesMap1, id)),
          label: "Interseção",
        },
      ];

      // console.log("[VENN DEBUG] Dados finais para o Venn.js:", JSON.parse(JSON.stringify(finalSets)));

      this.setsData = finalSets;
      this.loading = false;
      // console.log("[VENN DEBUG] generateDiagramData CONCLUÍDO. Loading set to false.");
    },

    drawChart(data) {
      // console.log("[VENN DEBUG] drawChart CHAMADO com:", JSON.parse(JSON.stringify(data)));

      if (!data || data.length === 0) return;
      // Acessa refs com this.$refs
      if (!this.$refs.vennContainer) {
          console.error("[VENN DEBUG] drawChart: container do Venn ($refs) é NULO.");
          return;
      }

      // console.log("[VENN DEBUG] Container do Venn ($refs):", this.$refs.vennContainer);

      // Acessa refs com this.$refs
      const div = d3.select(this.$refs.vennContainer);
      const tooltipEl = d3.select(this.$refs.tooltip);

      div.selectAll("svg").remove();
      // console.log("[VENN DEBUG] SVG anterior removido (se existia).");

      const chart = venn.VennDiagram().width(500).height(450);
      const g = div.datum(data).call(chart);
      // console.log("[VENN DEBUG] venn.js .call(chart) executado.");

      // Correção de Posição
      const circleGroups = g.selectAll("g.venn-circle")
          .filter(d => d.sets.length === 1);
      let group1 = null;
      let group2 = null;
      circleGroups.each(function(d) {
          const selection = d3.select(this);
          if (d.sets.includes("Grafo 1")) group1 = { element: selection, data: d };
          else if (d.sets.includes("Grafo 2")) group2 = { element: selection, data: d };
      });

      if (group1 && group2 && group1.data.x > group2.data.x) {
          const transform1 = group1.element.attr("transform");
          const transform2 = group2.element.attr("transform");
          group1.element.attr("transform", transform2);
          group2.element.attr("transform", transform1);
          group1.element.select("text").style("fill", "#ff7f0e");
          group2.element.select("text").style("fill", "#1f77b4");
      } else {
           if (group1) group1.element.select("text").style("fill", "#1f77b4");
           if (group2) group2.element.select("text").style("fill", "#ff7f0e");
      }
       g.selectAll("g.venn-intersection").select("text").style("fill", "#555");

      // Tooltips
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

      // console.log("[VENN DEBUG] Listeners de Tooltip anexados.");
    },
  },
  // mounted() { // O mounted não é estritamente necessário aqui por causa do immediate:true nos watchers
    // console.log("[VENN DEBUG] Componente VennDiagram MONTADO (mounted).");
    // console.log("[VENN DEBUG] Container ref no mounted:", this.$refs.vennContainer);
  // },
};
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