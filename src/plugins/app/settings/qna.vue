<template>
  <ion-page>
    <i-header title="Otazky a odpovede" />
    <ion-content class="ion-padding">
      <h1>Otázky</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
} from '@ionic/vue';

export default defineComponent({
  name: 'Otazky',
  components: {
    IonContent,
    IonPage,
  },
});
</script>

<style lang="scss" scoped>
</style>
