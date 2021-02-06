<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>

  <ion-card
    v-for="entity in entities"
    :key="entity.id"
    button
    :router-link="`/entity-detail/${entity.id}`"
  >
    <ion-img :src="entity.images[0].url" />
    <ion-card-header>
      <ion-card-subtitle>{{ entity.lon }} {{ entity.lat }}</ion-card-subtitle>
      <ion-card-title v-if="entity.type === 'bench'">
        Lavička
      </ion-card-title>
    </ion-card-header>

    <!--    <ion-card-content>-->
    <!--      Keep close to Nature's heart... and break clear away, once in awhile,-->
    <!--      and climb a mountain or spend a week in the woods. Wash your spirit clean.-->
    <!--    </ion-card-content>-->
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonRefresher,
  IonRefresherContent,
  IonCard,
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
  computed: {
    entities() {
      return this.$store.state.entities;
    },
  },
  methods: {
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchEntities');
      // @ts-expect-error
      e.target.complete();
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
