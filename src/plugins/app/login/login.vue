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
    </ion-content>
    <ion-footer>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="login()"
      >
        Prihlásenie cez Facebook
      </ion-button>
      <ion-button
        router-link="/slides"
        class="ion-margin"
      >
        slides
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
  IonImg,
  IonText, loadingController,
} from '@ionic/vue';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
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
