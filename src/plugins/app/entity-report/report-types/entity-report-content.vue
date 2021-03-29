<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="goBack()" />
      </ion-buttons>
      <ion-title>Nahlásenie obsahu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <h1>Obsah</h1>
    <ion-textarea />
  </ion-content>
  <ion-footer>
    <ion-button expand="block" class="ion-margin">
      Odoslať
    </ion-button>
  </ion-footer>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import {
  IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonFooter, IonTextarea,
} from '@ionic/vue'

export default defineComponent({
  name: 'EntityReportContent',
  components: {
    IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonFooter, IonTextarea,
  },
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      const nav = document.querySelector('ion-nav')
      if (!nav) return
      nav.pop()
    },
    test() {
      console.log(this.entity)
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
