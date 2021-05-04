<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Nevhodný obsah
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding ion-text-center">
    <ion-img :src="require('./img/appreciation.svg')" class="ion-margin-bottom" />
    <h1>Ďakujeme za nahlásenie</h1>
    <p>Vďaka Vám dokážeme udržať Mapovanie bezpečné a aktuálne.</p>
  </ion-content>
  <ion-footer class="ion-padding">
    <ion-button
      expand="block"
      @click="closeModal()"
    >
      Hotovo
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
  },
  methods: {
    async closeModal() {
      await modalController.dismiss()
    },
  },
})
</script>
