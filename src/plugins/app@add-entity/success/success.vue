<template>
  <ion-page>
    <a-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/success.svg')" class="ion-margin-bottom" />
      <ion-text class="text-3xl">
        <h1>Ďakujeme</h1>
      </ion-text>
      <ion-text>
        <p class="mt-6">
          Lavička bola úspešne pridaná do mapy.
        </p>
      </ion-text>
    </ion-content>

    <ion-footer>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="hotfix()"
      >
        Späť na príspevky
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonText,
  IonImg,
} from '@ionic/vue'

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
    IonText,
    IonImg,
  },
  methods: {
    // TODO fix ionic thing
    async hotfix() {
      await this.$router.push({ name: 'Categories' })
      await this.$router.push({ name: 'Latest' })
    },
  },
})
</script>
