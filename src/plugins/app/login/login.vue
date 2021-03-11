<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/login.svg')" />
      <ion-text>
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
        @click="login()"
      >
        <ion-icon
          size="large"
          :icon="logoFacebook"
        />
        <h5 class="ion-no-margin ion-padding font-weight-bold">
          Continue with Facebook
        </h5>
      </ion-button>
      <ion-button
        :strong="true"
        expand="block"
        size="large"
        class="ion-margin-top apple-login"
        router-link="/tabs"
      >
        <ion-icon
          size="large"
          class=""
          :icon="logoApple"
        />
        <h5 class="ion-no-margin ion-padding font-weight-bold">
          Continue with Apple
        </h5>
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
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonButton,
  IonImg,
  IonText,
  loadingController,
  IonIcon,
} from '@ionic/vue'

import { logoFacebook, logoApple } from 'ionicons/icons'

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonImg,
    IonText,
    IonIcon,
  },
  data() {
    return {
      logoFacebook,
      logoApple,
    }
  },
  methods: {
    async login() {
      const test = await loadingController.create({ message: 'Prihlasujem...' })
      await test.present()
      await this.$store.dispatch('login')
      await test.dismiss()
      console.log('JE TO TAM')
    },
  },
})
</script>

<style lang="scss" scoped>
.fb-login {
  --background: #1877f2;
  --border-radius: 5px;
}
@media (prefers-color-scheme: dark) {
  .apple-login {
    --background: #fff;
    --border-radius: 5px;
    --color: #000;
    --background-hover: #ccc;

  }
}
@media (prefers-color-scheme: light) {
  .apple-login {
    --background: #000;
    --border-radius: 5px;
    --color: #fff;
    --background-hover: #333;
  }
}
</style>
