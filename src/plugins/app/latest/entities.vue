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
    <ion-img :src="require('./img/lavicka.jpg')" />
    <ion-card-header>
      <ion-card-subtitle>Mierová 14</ion-card-subtitle>
      <ion-card-title>Lavička</ion-card-title>
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
  IonImg,
} from '@ionic/vue';

export default defineComponent({
  name: 'Entities',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
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
