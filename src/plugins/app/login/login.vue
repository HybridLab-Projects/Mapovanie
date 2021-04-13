<template>
  <ion-page>
    <a-header title="Mapovanie" />
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
        @click="facebookLogin()"
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
        @click="appleLogin()"
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
