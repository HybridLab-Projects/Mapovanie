<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>
  <ion-item
    v-for="num in itemCount"
    :key="num"
  >
    <ion-label>
      Item {{ num }}
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  name: 'Leaderboard',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      itemCount: 2,
    };
  },
  methods: {
    doRefresh(e: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        this.itemCount += 2;
        // @ts-expect-error
        e.target.complete();
      }, 1000);
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
