<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mapovanie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Gratulujem</h1>
      <p>Úspešne si pridal strom do našej databázy.</p>
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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/vue';

export default defineComponent({
  name: 'Success',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
});
</script>

<style lang="scss" scoped>
</style>
