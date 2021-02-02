<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding">
      <h1>Gratulujem</h1>
      <p>Úspešne si pridal záznam do našej databázy.</p>
    </ion-content>
    <ion-button
      class="ion-margin"
      router-link="/"
    >
      Späť na domovskú obrazovku
    </ion-button>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/vue';

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
});
</script>

<style lang="scss" scoped>
</style>
