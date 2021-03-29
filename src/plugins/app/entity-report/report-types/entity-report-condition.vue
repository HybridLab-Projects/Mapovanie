<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="goBack()" />
      </ion-buttons>
      <ion-title>Nahlásenie stavu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <h1>Stav</h1>
    <ion-button @click="test()">
      test
    </ion-button>
  </ion-content>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import {
  IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
} from '@ionic/vue'

export default defineComponent({
  name: 'EntityReportCondition',
  components: {
    IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
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
