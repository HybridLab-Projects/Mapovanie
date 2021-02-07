<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button />
        </ion-buttons>
        <ion-title>Otázky a odpovede</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Ako?</ion-label>
        <ion-select interface="popover" />
      </ion-item>

      <ion-item>
        <ion-label>Kde?</ion-label>
        <ion-select interface="popover" />
      </ion-item>

      <ion-item>
        <ion-label>Preco?</ion-label>
        <ion-select interface="popover" />
      </ion-item>

      <ion-item>
        <ion-label>Kedy?</ion-label>
        <ion-select interface="popover" />
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonContent,
  IonBackButton,
} from '@ionic/vue';

export default defineComponent({
  name: 'Otazky',
  components: {
    IonPage,
    IonToolbar,
    IonHeader,
    IonContent,
    IonBackButton,
  },
});
</script>

<style lang="scss" scoped>
</style>
