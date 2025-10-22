<template>
  <v-row class="my-4" dense>
    <!-- Número de Nós -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Num de Nós
          <v-tooltip
            location="top"
            text="Quantidade total de vértices (nós) presentes no grafo."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">{{ metrics.numero_nos ?? 0 }}</div>
      </v-card>
    </v-col>

    <!-- Número de Arestas -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Num de Arestas
          <v-tooltip
            location="top"
            text="Quantidade total de conexões (arestas) entre os nós."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">{{ metrics.numero_arestas ?? 0 }}</div>
      </v-card>
    </v-col>

    <!-- Grau Médio -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Grau Médio
          <v-tooltip
            location="top"
            text="Média do número de conexões por nó. Fórmula: soma(grau(nó_i)) / número_total_de_nós."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">
          {{
            metrics.grau_medio != null ? metrics.grau_medio.toFixed(3) : "0.000"
          }}
        </div>
      </v-card>
    </v-col>

    <!-- Distribuição de Graus -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Distr. de Graus
          <v-tooltip
            location="top"
            text="Mostra quantos nós possuem determinado número de conexões."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6 scrollable-content">
          {{
            metrics.distribuicao_graus
              ? JSON.stringify(metrics.distribuicao_graus)
              : "{}"
          }}
        </div>
      </v-card>
    </v-col>

    <!-- Centralidade Média Grau -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          C.M.Grau
          <v-tooltip
            location="top"
            text="Mede a importância de um nó com base nas conexões diretas (grau normalizado)."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">
          {{ metrics.centralidade_media_grau?.toFixed(3) ?? "0.000" }}
        </div>
      </v-card>
    </v-col>

    <!-- Centralidade Média Betweenness -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Cent.M.Betweenness
          <v-tooltip
            location="top"
            text="Mede o quanto um nó aparece em caminhos mínimos entre pares de nós (intermediação)."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">
          {{ metrics.centralidade_media_betweenness?.toFixed(3) ?? "0.000" }}
        </div>
      </v-card>
    </v-col>

    <!-- Diâmetro -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Diâmetro
          <v-tooltip
            location="top"
            text="Maior distância entre dois nós (em número de arestas)."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">{{ metrics.diametro ?? 0 }}</div>
      </v-card>
    </v-col>

    <!-- Densidade -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          Densidade
          <v-tooltip
            location="top"
            text="Proporção de arestas existentes em relação ao número máximo possível."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">
          {{
            metrics.densidade != null ? metrics.densidade.toFixed(3) : "0.000"
          }}
        </div>
      </v-card>
    </v-col>

    <!-- Número de Componentes Conexos -->
    <v-col cols="12" sm="6" md="4">
      <v-card outlined class="pa-3">
        <div class="d-flex align-center justify-space-between text-subtitle-1">
          N.C.Conexos
          <v-tooltip
            location="top"
            text="Número de grupos de nós conectados entre si, mas desconectados dos demais."
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" color="grey" size="small" class="ms-2">
                mdi-information
              </v-icon>
            </template>
          </v-tooltip>
        </div>
        <div class="text-h6">{{ metrics.numero_componentes_conexos ?? 0 }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    metrics: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-icon {
  cursor: pointer;
}
.scrollable-content {
  overflow-x: auto; /* Habilita o scroll horizontal */
  white-space: nowrap; /* Impede a quebra de linha do texto */
}
</style>
