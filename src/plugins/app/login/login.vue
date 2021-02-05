<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <h1>Login</h1>
    </ion-content>
    <ion-footer>
      <ion-button
        expand="block"
        class="ion-margin"
        router-link="/tabs"
      >
        Prihlásenie cez Facebook
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
} from '@ionic/vue';

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
  },
});
</script>

<style lang="scss" scoped>
</style>
