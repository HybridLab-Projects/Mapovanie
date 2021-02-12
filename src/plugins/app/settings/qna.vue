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
      <ion-list>
        <div
          v-for="(question,i) in questions"
          :key="i"
        >
          <ion-item
            :lines="selectedQuestion === i ? 'none' : 'inset'"
            button
            :detail-icon="selectedQuestion === i ? chevronDown : 'chevron-forward'"
            @click="toggleSelectedQuestion(i)"
          >
            <ion-label> {{ question.title }} </ion-label>
          </ion-item>
          <ion-item v-if="selectedQuestion === i">
            <ion-text>
              <p>
                {{ question.answer }}
              </p>
            </ion-text>
          </ion-item>
        </div>
      </ion-list>
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
  IonButtons,
  IonTitle,
  IonLabel,
  IonText,
  IonItem,
  IonList,
} from '@ionic/vue';

import { chevronDown } from 'ionicons/icons';

export default defineComponent({
  name: 'Otazky',
  components: {
    IonPage,
    IonToolbar,
    IonHeader,
    IonContent,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonLabel,
    IonText,
    IonItem,
    IonList,
  },
  data() {
    return {
      questions: [
        {
          title: 'Čo je Mapovanie?',
          answer: 'You have a choice of over 60 carefully selected Bratislava hotels, botels, pensions, apartments ranging from budget to luxury',
        },
        {
          title: 'Ako sa mapuje?',
          answer: 'Salivary gland tumours treated in the stomatological clinics in Bratislava',
        },
        {
          title: 'Prečo mapujeme?',
          answer: 'Kiev occupies the highest spot in the ranking, followed by Istanbul, Bratislava, Upper Silesia and Sofia in the top-5 manufacturing hubs',
        },
      ],
      selectedQuestion: -1,
      chevronDown,
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
