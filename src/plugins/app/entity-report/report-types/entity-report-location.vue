<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="goBack()" />
      </ion-buttons>
      <ion-title>Nahlásenie zlej polohy</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <h1>Lokacia</h1>
    <ion-button @click="test()">
      test
    </ion-button>
    <div id="map-container-report" class="map-container-report" />
  </ion-content>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import {
  IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
} from '@ionic/vue'
import Mapbox from 'mapbox-gl'

export default defineComponent({
  name: 'EntityReportLocation',
  components: {
    IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, IonBackButton, IonButton,
  },
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newLocation: { lon: 0, lat: 0 },
    }
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
  ionViewDidEnter() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    const map = new Mapbox.Map({
      container: 'map-container-report',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.entity.lon, this.entity.lat],
      zoom: 18,
    })

    const marker = new Mapbox.Marker()
      .setLngLat([this.entity.lon, this.entity.late])
      .addTo(map)

    map.on('click', (e) => {
      console.log(e)
      marker.setLngLat(e.lngLat)
      this.newLocation.lon = e.lngLat.lng
      this.newLocation.lat = e.lngLat.lat
    })
  },
})
</script>

<style lang="scss" scoped>
.map-container-report {
  border-radius: 5%;
  height: 70vw;
  margin: 2rem auto auto;
  width: calc(100% - 2rem);
}
</style>
