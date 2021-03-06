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
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-header>
      <ion-card-subtitle class="d-flex">
        <ion-icon
          :icon="locationOutline"
          size="small"
          class="mr-1"
        />
        <span class="ion-align-self-center">{{ entity?.address?.split(',')[0] }}</span>
      </ion-card-subtitle>
      <ion-card-title
        v-if="entity?.type === 'bench'"
        class="d-flex ion-margin-top"
      >
        <ion-icon
          :icon="mapOutline"
          size="large"
          class="ion-margin-end"
        />
        <span class="ion-align-self-center">Lavička</span>
      </ion-card-title>
    </ion-card-header>
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
  IonIcon,
} from '@ionic/vue';
import { locationOutline, mapOutline } from 'ionicons/icons';
import { Entity } from '@/plugins/app/_config/types';

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
    IonIcon,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
    };
  },
  computed: {
    entities(): Array<Entity> {
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
