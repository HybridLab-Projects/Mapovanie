<template>
  <ion-page>
    <a-header
      title="Formulár"
      back
    />
    <ion-content>
      <ion-img
        :src="image.webPath"
        class="ion-margin-top"
        @click="retakePicture()"
      />
      <ion-item class="ion-margin-bottom">
        <ion-label position="floating">
          Popis
        </ion-label>
        <ion-textarea v-model="description" />
      </ion-item>
      <ion-text>
        <h4 class="ion-text-center ion-margin-vertical font-bold">
          Presná poloha
        </h4>
      </ion-text>
      <div id="map-container-form" class="map-container-form" />
      <ion-button
        expand="block"
        class="ion-margin"
        :disabled="!description.length"
        @click="submit()"
      >
        Odoslať
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  loadingController,
  alertController,
  IonPage,
  IonContent,
  IonImg,
  IonButton,
  IonFooter,
  IonTextarea, IonLabel, IonItem, IonText,
} from '@ionic/vue'
import Axios from 'axios'

import {
  Plugins, GeolocationPosition, CameraPhoto,
} from '@capacitor/core'
import Camera from '@/plugins/jakub@capacitor/camera'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import Mapbox, { Map } from 'mapbox-gl'

const { Device } = Plugins
export default defineComponent({
  name: 'Form',
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonButton,
    IonTextarea,
    IonLabel,
    IonItem,
    IonText,
  },
  data() {
    return {
      image: {} as CameraPhoto,
      deviceLocation: {} as GeolocationPosition,
      categoryId: 0,
      groupId: 0,
      description: '',
      map: {} as Mapbox.Map,
    }
  },
  ionViewWillEnter() {
    const imageStringified = this.$route.params.image as string
    const deviceLocationStringified = this.$route.params.deviceLocation as string
    const groupIdStringified = this.$route.params.groupId as string
    const categoryIdStringified = this.$route.params.categoryId as string

    this.image = JSON.parse(imageStringified)
    this.deviceLocation = JSON.parse(deviceLocationStringified)
    this.groupId = JSON.parse(groupIdStringified)
    this.categoryId = JSON.parse(categoryIdStringified)
  },
  ionViewDidEnter() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    if (Object.keys(this.map).length) return
    this.map = new Mapbox.Map({
      container: 'map-container-form',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.deviceLocation.coords.longitude, this.deviceLocation.coords.latitude],
      zoom: 18,
    })

    const marker = new Mapbox.Marker()
      .setLngLat([this.deviceLocation.coords.longitude, this.deviceLocation.coords.latitude])
      .addTo(this.map)

    this.map.on('click', (e) => {
      console.log(e)
      marker.setLngLat(e.lngLat)
      this.deviceLocation.coords.longitude = e.lngLat.lng
      this.deviceLocation.coords.latitude = e.lngLat.lat
    })
  },
  methods: {
    async retakePicture() {
      try {
        this.image = await Camera.getFullPhoto()
        this.deviceLocation = await Geolocation.getDeviceLocation()
      } catch (err) {
        console.log(err)
      }
    },
    async submit() {
      const loading = await loadingController.create({
        message: 'Odosielam...',
      })
      try {
        await loading.present()
        const deviceInfo = await Device.getInfo()

        const { longitude, latitude } = this.deviceLocation.coords

        await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.groupId}/categories/${this.categoryId}/entities`, {
          longitude,
          latitude,
          device_uuid: deviceInfo.uuid,
          image: this.image.dataUrl,
          category_id: this.categoryId,
          description: this.description,
        })
        await this.$store.dispatch('fetchEntities')
        await this.$store.dispatch('fetchLeaderboardUsers')
        await this.$store.dispatch('fetchUserinfo')

        await loading.dismiss()
        await this.$router.push({
          name: 'Success',
        })
      } catch (err) {
        console.log(err)

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

<style lang="postcss" scoped>
.map-container-form {
  height: 100vw;
  width: 100vw;
}
</style>
