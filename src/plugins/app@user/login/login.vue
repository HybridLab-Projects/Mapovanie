<template>
  <ion-page>
    <ion-content class="ion-text-center">
      <ion-img :src="require('./img/bluepoint.svg')" class="w-56 mx-auto mt-10" />

      <ion-text>
        <h1 class="main-text mt-10 text-2xl font-bold">
          Prihlásenie
        </h1>
        <p class="px-10 mt-1">
          Prihláste sa cez jedného z poskytovateľov.
        </p>
      </ion-text>
      <ion-button
        expand="block"
        size="large"
        class="mt-10 fb-login ion-margin"
        @click="facebookLogin()"
      >
        <ion-icon
          size="large"
          :icon="logoFacebook"
        />
        <h5 class="ion-no-margin ion-padding font-bold">
          Prihlásiť sa cez Facebook
        </h5>
      </ion-button>
      <ion-button
        :strong="true"
        expand="block"
        size="large"
        class="ion-margin-top apple-login ion-margin"
        @click="appleLogin()"
      >
        <ion-icon
          size="large"
          class=""
          :icon="logoApple"
        />
        <h5 class="ion-no-margin ion-padding font-bold">
          Prihlásiť sa cez Apple ID
        </h5>
      </ion-button>
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
import { Plugins } from '@capacitor/core'
import { logoFacebook, logoApple } from 'ionicons/icons'
import { SignInWithAppleOptions, SignInWithAppleResponse } from '@capacitor-community/apple-sign-in'
import Axios from 'axios'

const { SignInWithApple, FacebookLogin } = Plugins
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
    async facebookLogin() {
      const loader = await loadingController.create({ message: 'Prihlasujem...' })
      await loader.present()
      try {
        const loginResponse = await FacebookLogin.login({ permissions: ['email', 'public_profile'] })
        const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/facebook', { oauth_token: loginResponse.accessToken?.token })
        await this.$store.dispatch('login', data.data)
        await loader.dismiss()
      } catch (err) {
        console.log('FB login error', err)
        await loader.dismiss()
      }
    },
    async appleLogin() {
      const loader = await loadingController.create({ message: 'Prihlasujem...' })
      await loader.present()
      try {
        const options: SignInWithAppleOptions = {
          clientId: 'dev.hybridlab.mapovanie-app',
          redirectURI: 'https://mapovanie.hybridlab.dev/login',
          scopes: 'email name',
        }
        const loginResponse: SignInWithAppleResponse = await SignInWithApple.authorize(options)
        const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/apple', {
          auth_code: loginResponse.response.authorizationCode,
          name: loginResponse.response.givenName,
          surname: loginResponse.response.familyName,
          email: loginResponse.response.email,
        })
        await this.$store.dispatch('login', data.data)
        await loader.dismiss()
      } catch (err) {
        console.log('Apple login error', err)
        await loader.dismiss()
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
ion-content {
  --background: linear-gradient(transparent, white 35%), url("./img/map.svg");
}

.fb-login {
  --background: #1877f2;
}

@media (prefers-color-scheme: dark) {
  .apple-login {
    --background: #fff;
    --color: #000;
    --background-hover: #ccc;
  }
}

@media (prefers-color-scheme: light) {
  .apple-login {
    --background: #000;
    --color: #fff;
    --background-hover: #333;
  }
}
</style>
