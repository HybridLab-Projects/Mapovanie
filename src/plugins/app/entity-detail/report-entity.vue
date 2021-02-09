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
      <h1>test</h1>
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
} from '@ionic/vue';

export default defineComponent({
  name: 'ReportEntity',
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
  },
});
</script>

<style lang="scss">

</style>
