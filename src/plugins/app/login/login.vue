<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/login.svg')" />
      <ion-text class="ion-margin-bottom">
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </ion-text>
      <ion-button
        expand="block"
        size="large"
        class="ion-margin-top fb-login"
        router-link="/tabs"
      >
        <ion-icon
          size="large"
          class=""
          :icon="logoFacebook"
        />
        <h5 class="ion-no-margin ion-padding">
          Prihlásiť cez Facebook
        </h5>
      </ion-button>
      <ion-button
        expand="block"
        size="large"
        class="ion-margin-top apple-login"
        router-link="/tabs"
      >
        <ion-icon
          size="large"
          class=""
          :icon="logoFacebook"
        />
        <h5 class="ion-no-margin ion-padding">
          Prihlásiť cez Apple ID
        </h5>
      </ion-button>
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
  IonText,
} from '@ionic/vue';

import { logoFacebook } from 'ionicons/icons';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton,
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
.fb-login {
  --background: #1877F2;
  --border-radius: 5px;
}
.apple-login {
  --background: #ffffff;
  --border-radius: 5px;
  --color: #000000;
  --border-width: 2px;
  --border-color: #000000;
  --border-style: solid;
}
</style>
