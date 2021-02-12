<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button />
        </ion-buttons>
        <ion-title>Otázky a odpovede</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item
        v-for="(question,i) in questions"
        :key="i"
        @click="toggleSelectedQuestion(i)"
      >
        <ion-label> {{ question.title }} </ion-label>
        <ion-text v-if="selectedQuestion === i">
          <p>
            {{ question.answer }}
          </p>
        </ion-text>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonContent,
  IonBackButton,
  IonText,
} from '@ionic/vue';

export default defineComponent({
  name: 'Otazky',
  components: {
    IonPage,
    IonToolbar,
    IonHeader,
    IonContent,
    IonBackButton,
    IonText,
  },
  data() {
    return {
      questions: [
        {
          title: 'Ako',
          answer: "f you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just is",
        },
        {
          title: 'Preco',
          answer: 'as;dflkjfa',
        },
        {
          title: 'How',
          answer: 'LAJSdlalkjd',
        },
      ],
      selectedQuestion: -1,
    };
  },
  methods: {
    toggleSelectedQuestion(questionId: any) {
      this.selectedQuestion = this.selectedQuestion === questionId ? '' : questionId;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
