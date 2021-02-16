<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/login.svg')" />
      <ion-text>
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit./n
          Lorem ipsum dolor sit amet, consectetur adipisicing elit./n
        </p>
      </ion-text>
    </ion-content>
    <ion-footer style="text-align:center">
      <ion-button
        style="
        --background: #1877F2;
        --border-radius: 5px;
        margin-bottom: 60%;
        width: 80%;"
        class="ion-margin"
        router-link="/tabs"
      >
        <ion-icon :icon="logoFacebook" />
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
  IonImg,
  IonText,
} from '@ionic/vue';

import { logoFacebook } from 'ionicons/icons';

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
  data() {
    return {
      logoFacebook,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
