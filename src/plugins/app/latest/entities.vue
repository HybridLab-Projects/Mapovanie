<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>

  <ion-card
    v-for="num in cardCount"
    :key="num"
  >
    <ion-card-header>
      <ion-card-subtitle>Card Subtitle {{ num }}</ion-card-subtitle>
      <ion-card-title>Card Title</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/vue';

export default defineComponent({
  name: 'Latest',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },
  data() {
    return {
      cardCount: 2,
    };
  },
  methods: {
    doRefresh(e: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        this.cardCount += 2;
        // @ts-expect-error
        e.target.complete();
      }, 1000);
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
