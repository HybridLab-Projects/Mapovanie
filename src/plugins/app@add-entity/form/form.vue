<template>
  <ion-page>
    <a-header
      title="Pridať lavičku"
      back
    />
    <ion-content class="ion-padding">
      <ion-img
        :src="image.webPath"
        class="ion-padding form-img"
        @click="retakePicture()"
      />
      <div id="map-container-form" class="map-container-form" />
    </ion-content>
    <ion-footer>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="submit()"
      >
        Odoslať
      </ion-button>
    </ion-footer>
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
} from '@ionic/vue'
import Axios from 'axios'

import {
  Plugins, GeolocationPosition, CameraPhoto,
} from '@capacitor/core'
import Camera from '@/plugins/jakub@capacitor/camera'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import Mapbox from 'mapbox-gl'

const { Device } = Plugins
export default defineComponent({
  name: 'Form',
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonButton,
    IonFooter,
  },
  data() {
    return {
      image: {} as CameraPhoto,
      deviceLocation: {} as GeolocationPosition,
      categoryId: 0,
      groupId: 0,
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
    const map = new Mapbox.Map({
      container: 'map-container-form',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.deviceLocation.coords.longitude, this.deviceLocation.coords.latitude],
      zoom: 18,
    })

    const marker = new Mapbox.Marker()
      .setLngLat([this.deviceLocation.coords.longitude, this.deviceLocation.coords.latitude])
      .addTo(map)

    map.on('click', (e) => {
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
.form-img::part(image) {
  border-radius: 5%;
}

.map-container-form {
  border-radius: 5%;
  height: 70vw;
  margin: 2rem auto auto;
  width: calc(100% - 2rem);
}
</style>
