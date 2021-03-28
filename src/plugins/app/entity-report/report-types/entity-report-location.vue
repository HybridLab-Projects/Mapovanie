<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="goBack()" />
      </ion-buttons>
      <ion-title>Nahlásenie zlej polohy</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <p class="ion-no-margin ion-margin-bottom">
      Prosím vyberte správnu polohu objektu.
    </p>
    <div id="map-container-report" class="map-container-report" />
    <ion-button
      expand="block"
      color="primary"
      class="ion-margin-top"
      @click="reportEntity()"
    >
      Nahlásiť
    </ion-button>
  </ion-content>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import {
  IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
  loadingController, alertController,
} from '@ionic/vue'
import Mapbox from 'mapbox-gl'
import { Entity } from '@/plugins/app/_config/types'
import EntityReportSuccessView from '@/plugins/app/entity-report/entity-report-success.vue'

export default defineComponent({
  name: 'EntityReportLocation',
  components: {
    IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
  },
  props: {
    entity: {
      type: Object as PropType<Entity>,
      required: true,
    },
  },
  data() {
    return {
      newLocation: { lon: 0, lat: 0 },
    }
  },
  mounted() {
    console.log('mounted')
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    const map = new Mapbox.Map({
      container: 'map-container-report',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+this.entity.lon, +this.entity.lat],
      zoom: 18,
    })

    const marker = new Mapbox.Marker()
      .setLngLat([+this.entity.lon, +this.entity.lat])
      .addTo(map)

    map.on('click', (e) => {
      console.log(e)
      marker.setLngLat(e.lngLat)
      this.newLocation.lon = e.lngLat.lng
      this.newLocation.lat = e.lngLat.lat
    })
    map.on('load', () => {
      map.resize()
    })
  },
  methods: {
    goBack() {
      const ionNav = document.querySelector('ion-nav')
      if (!ionNav) return
      ionNav.pop()
    },
    async reportEntity() {
      const loading = await loadingController.create({
        message: 'Odosielam...',
      })
      try {
        await loading.present()
        await this.$store.dispatch('reportEntity', {
          entityId: this.entity.id,
          type: 'wrong_place',
          content: `Navrhovaná nová lokácia je: lon-${this.newLocation.lon}, lat-${this.newLocation.lat}.`,
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

<style lang="scss" scoped>
.map-container-report {
  border-radius: 5%;
  height: 70vw;
  width: 100%;
}
</style>
