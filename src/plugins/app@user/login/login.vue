<template>
  <ion-page>
    <ion-content class="ion-text-center">
      <ion-img class="background-map" :src="require('./img/background.svg')" />
      <ion-img class="bluepoint" :src="require('./img/bluepoint.svg')" />

      <ion-text class="login-text">
        <h1 class="main-text">
          Prihlásenie
        </h1>
        <p>
          Zadajte vaše meno alebo sa prihláste pomocou google účtu.
        </p>
      </ion-text>
      <ion-button
        expand="block"
        size="large"
        class="ion-margin-top fb-login ion-margin"
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

<style lang="postcss" scoped>
.background-map {
  position: absolute;
}

.bluepoint {
  position: relative;
  width: 60%;
  margin: auto;
  margin-top: 50px;
}

.login-text {
  position: relative;
  color: #000;
}

.main-text {
  margin-top: 50px;
  font-size: 25px;
  font-weight: 700;
}

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
