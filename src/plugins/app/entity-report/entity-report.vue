<template>
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
        @click="sendReport()"
      >
        <ion-label>Zmena stavu</ion-label>
      </ion-item>
      <ion-item
        button
        @click="sendReport()"
      >
        <ion-label>Zlá poloha</ion-label>
      </ion-item>

      <ion-item
        button
        @click="sendReport()"
      >
        <ion-label>Nevhodný obsah</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import EntityReportSuccess from './entity-report-success.vue';

export default defineComponent({
  name: 'EntityReport',
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
  },
  methods: {
    sendReport() {
      const ionNav = document.querySelector('ion-nav') as HTMLIonNavElement;
      ionNav.push(EntityReportSuccess);
    },
  },
});
</script>

<style lang="scss">

</style>
