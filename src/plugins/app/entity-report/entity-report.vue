<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Nahlásiť
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item
          button
        >
          <ion-label>Zmena stavu</ion-label>
        </ion-item>
        <ion-item
          button
        >
          <ion-label>Zlá poloha</ion-label>
        </ion-item>
        <ion-item
          button
        >
          <ion-label>Nevhodný obsah</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  name: 'EntityReport',
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
});
</script>

<style lang="scss">

</style>
