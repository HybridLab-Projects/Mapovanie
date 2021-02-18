<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/login.png')" />
      <ion-text>
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit./n
          Lorem ipsum dolor sit amet, consectetur adipisicing elit./n
        </p>
      </ion-text>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="login()"
      >
        Prihlásiť sa
      </ion-button>
      <div class="ion-text-center">
        <ion-button
          router-link="/slides"
          fill="clear"
        >
          Zobraziť úvod
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonButton,
  IonImg,
  IonText, loadingController,
} from '@ionic/vue';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonImg,
    IonText,
  },
  methods: {
    async login() {
      const test = await loadingController.create({ message: 'Prihlasujem...' });
      await test.present();
      await this.$store.dispatch('login');
      await test.dismiss();
      console.log('JE TO TAM');
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
