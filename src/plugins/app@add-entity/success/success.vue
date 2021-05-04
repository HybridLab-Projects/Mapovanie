<template>
  <ion-page>
    <a-header title="Mapovanie" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img :src="require('./img/confirmed.svg')" class="ion-margin-bottom" />
      <h1>Ďakujeme</h1>
      <p>Lavička bola úspešne pridaná do databázy.</p>
    </ion-content>
    <ion-footer>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="hotfix()"
      >
        Späť na domovskú obrazovku
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
} from '@ionic/vue'

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
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
