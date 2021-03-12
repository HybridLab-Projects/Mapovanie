<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title v-if="entity?.type === 'bench'">
          Lavička
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openReportModal()">
            <ion-icon
              slot="icon-only"
              :icon="flagOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-img
        :src="entity?.images[0]?.url"
      />
      <div class="ion-padding">
        <ion-text
          color="medium"
          class="d-flex"
        >
          <ion-icon
            :icon="locationOutline"
            size="large"
            class="ion-margin-end"
          />
          <h5 class="font-weight-bold ion-align-self-center ion-no-margin">
            {{ entity?.address?.split(',')[0] }}
          </h5>
        </ion-text>
        <ion-text class="d-flex ion-margin-top">
          <ion-icon
            :icon="mapOutline"
            size="large"
            class="ion-margin-end"
          />
          <h1
            class="ion-no-margin ion ion-align-self-center"
          >
            {{ entity?.category.full_name }}
          </h1>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonImg,
  IonText,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  modalController,
} from '@ionic/vue'

import { flagOutline, locationOutline, mapOutline } from 'ionicons/icons'
import { Entity } from '@/plugins/app/_config/types'
import EntityReportModalNav from '../entity-report/entity-report-nav.vue'

export default defineComponent({
  name: 'EntityDetail',
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonText,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
  },
  data() {
    return {
      flagOutline,
      locationOutline,
      mapOutline,
      id: '0',
    }
  },
  computed: {
    entity(): Entity|undefined {
      return this.$store.getters.getEntity(this.id)
    },
  },
  ionViewWillEnter() {
    this.id = this.$route.params.id as string
  },
  methods: {
    async openReportModal() {
      console.log(this)
      const modal = await modalController.create({
        component: EntityReportModalNav,
        componentProps: {
          entity: this.entity,
        },
        swipeToClose: true,
        // eslint-disable-next-line no-undef
        presentingElement: document.querySelector('ion-router-outlet') as HTMLIonRouterOutletElement,
      })
      return modal.present()
    },
  },
})
</script>

<style lang="scss">

</style>
