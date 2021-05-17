<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="goBack()" />
      </ion-buttons>
      <ion-title>Nahlásenie stavu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <p class="ion-no-margin ion-margin-bottom">
      Prosím popíšte momentálny stav objektu.
    </p>
    <ion-item class="ion-no-padding">
      <ion-label position="floating">
        Opis momentálneho stavu
      </ion-label>
      <ion-textarea
        v-model="reportMessage"
        auto-grow
        maxlength="500"
      />
    </ion-item>
  </ion-content>
  <ion-footer class="ion-padding">
    <ion-button expand="block" @click="reportEntity()">
      Nahlásiť
    </ion-button>
  </ion-footer>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import {
  IonHeader,
  IonToolbar,
  IonFooter,
  IonButtons,
  IonContent,
  IonTitle,
  IonBackButton,
  IonButton,
  loadingController,
  alertController,
  IonTextarea,
  IonItem,
  IonLabel,
} from '@ionic/vue'
import EntityReportSuccessView from '@/plugins/app@entity/entity-report/entity-report-success.vue'
import { Entity } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'EntityReportCondition',
  components: {
    IonHeader,
    IonToolbar,
    IonFooter,
    IonButtons,
    IonContent,
    IonTitle,
    IonBackButton,
    IonButton,
    IonTextarea,
    IonItem,
    IonLabel,
  },
  props: {
    entity: {
      type: Object as PropType<Entity>,
      required: true,
    },
  },
  data() {
    return {
      reportMessage: '',
    }
  },
  methods: {
    goBack() {
      const nav = document.querySelector('ion-nav')
      if (!nav) return
      nav.pop()
    },
    async reportEntity() {
      const loading = await loadingController.create({
        message: 'Odosielam...',
      })
      try {
        await loading.present()
        await this.$store.dispatch('reportEntity', {
          entityId: this.entity.id,
          type: 'broken',
          content: this.reportMessage,
        })
        await loading.dismiss()

        const ionNav = document.querySelector('ion-nav')
        if (!ionNav) return
        ionNav.push(EntityReportSuccessView)
      } catch (err) {
        await loading.dismiss()

        const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Error',
            message: err.message || err,
            buttons: ['OK'],
          })
        await alert.present()
      }
    },
  },
})
</script>
