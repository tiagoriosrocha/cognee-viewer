<!-- Componente para exibir detalhes de uma pergunta -->
<!-- Este componente mostra todas as informações de uma pergunta selecionada -->

<template>
  <div v-if="question">
    <!-- Lista de informações básicas da pergunta -->
    <v-list dense>
      <!-- ID da pergunta -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          ID da Pergunta:
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text">
          {{ question._id }}
        </v-list-item-subtitle>
      </v-list-item>

      <!-- Texto da pergunta -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          Pergunta:
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text">
          {{ question.question }}
        </v-list-item-subtitle>
      </v-list-item>

      <!-- Resposta esperada -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          Resposta Esperada:
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text">
          {{ question.answer }}
        </v-list-item-subtitle>
      </v-list-item>

      <!-- Número de hops (subperguntas) -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          Hops (Subperguntas):
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text">
          {{ question.no_of_hops }}
        </v-list-item-subtitle>
      </v-list-item>

      <!-- Tipo de raciocínio -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          Tipo de Raciocínio:
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text">
          {{ question.reasoning_type }}
        </v-list-item-subtitle>
      </v-list-item>

      <!-- Texto de contexto -->
      <v-list-item v-if="contextText.length > 0">
        <v-list-item-title class="font-weight-bold">
          Texto de Contexto:
        </v-list-item-title>
        <div class="context-wrapper">
          <ul class="context-list">
            <li
              v-for="(context, index) in contextText"
              :key="index"
              class="mb-2"
            >
              <strong>{{ context.title }}:</strong>
              <span class="context-text">{{ context.text }}</span>
            </li>
          </ul>
        </div>
      </v-list-item>

      <!-- Sub-perguntas -->
      <v-list-item v-if="subQuestions.length > 0">
        <v-list-item-title class="font-weight-bold">
          Sub-Perguntas:
        </v-list-item-title>
        <div class="subquestions-wrapper">
          <ul class="subquestions-list">
            <li v-for="sub in subQuestions" :key="sub.sub_id" class="mb-2">
              <strong>{{ sub.sub_id }}:</strong> {{ sub.question }}
              <em>(Resposta: {{ sub.answer }})</em>
              <span v-if="sub.paragraph_support_title">
                — Contexto: {{ sub.paragraph_support_title }}
              </span>
            </li>
          </ul>
        </div>
      </v-list-item>
    </v-list>
  </div>

  <!-- Mensagem quando não há pergunta selecionada -->
  <div v-else class="text-center pa-4">
    <v-icon size="48" color="grey" class="mb-2">
      mdi-help-circle-outline
    </v-icon>
    <p class="text-body-1 text-grey-darken-1">Nenhuma pergunta selecionada</p>
  </div>
</template>

<script>
export default {
  name: "QuestionDetails",

  // Prop para receber a pergunta
  props: {
    question: {
      type: Object,
      default: null,
    },
  },

  computed: {
    // Computed para processar o texto de contexto
    contextText() {
      // Se não há pergunta ou contexto, retorna array vazio
      if (!this.question || !this.question.context) {
        return [];
      }

      // Processa o contexto para um formato mais legível
      return this.question.context.map(([title, paragraphs]) => ({
        title,
        text: paragraphs.join(" "),
      }));
    },

    // Computed para processar as sub-perguntas
    subQuestions() {
      // Se não há pergunta ou decomposição, retorna array vazio
      if (!this.question || !this.question.question_decomposition) {
        return [];
      }

      // Função recursiva para achatar as sub-perguntas
      const flattenSubQuestions = (subs) => {
        return subs.flatMap((sub) => {
          // Cria o objeto da sub-pergunta atual
          let result = [
            {
              sub_id: sub.sub_id,
              question: sub.question,
              answer: sub.answer,
              paragraph_support_title: sub.paragraph_support_title || "",
            },
          ];

          // Se há detalhes (sub-perguntas aninhadas), processa recursivamente
          if (sub.details && sub.details.length) {
            result = result.concat(flattenSubQuestions(sub.details));
          }

          return result;
        });
      };

      // Retorna as sub-perguntas processadas
      return flattenSubQuestions(this.question.question_decomposition);
    },
  },
};
</script>

<style scoped>
/* Estilos para quebrar texto longo */
.wrap-text {
  white-space: normal !important;
  word-wrap: break-word;
}

/* Estilos para o wrapper de contexto */
.context-wrapper {
  white-space: normal;
  overflow: visible;
  margin-top: 8px;
}

.context-list {
  list-style-type: none;
  padding-left: 0;
}

.context-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.context-text {
  display: block;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  line-height: 1.5;
}

/* Estilos para o wrapper de sub-perguntas */
.subquestions-wrapper {
  white-space: normal;
  overflow: visible;
  margin-top: 8px;
}

.subquestions-list {
  list-style-type: none;
  padding-left: 0;
}

.subquestions-list li {
  margin-bottom: 6px;
  line-height: 1.5;
}
</style>
