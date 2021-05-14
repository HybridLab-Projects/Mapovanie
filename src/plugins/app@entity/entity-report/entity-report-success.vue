<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Nevhodný obsah
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding ion-text-center">
    <ion-img :src="require('./img/report-success.svg')" class="ion-margin-bottom" />
    <ion-text class="text-3xl">
      <h1>Ďakujeme za nahlásenie</h1>
    </ion-text>
    <ion-text>
      <p class="mt-6">Vďaka Vám dokážeme udržat
        Mapovanie bezpečné a aktuálne.</p>
    </ion-text>
  </ion-content>
  <ion-footer class="ion-padding">
    <ion-button
      expand="block"
      @click="closeModal()"
    >
      Spat na prispevky
    </ion-button>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  modalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
  IonText,
} from '@ionic/vue'

export default defineComponent({
  name: 'EntityReportSuccess',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonFooter,
    IonText,
  },
  methods: {
    async closeModal() {
      await modalController.dismiss()
    },
  },
})
</script>
