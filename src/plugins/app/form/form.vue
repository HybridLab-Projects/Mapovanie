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
import Camera from '@/plugins/jakub/capacitor/camera'
import Geolocation from '@/plugins/jakub/capacitor/geolocation'

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
    }
  },
  ionViewWillEnter() {
    const imageStringified = this.$route.params.image as string
    const deviceLocationStringified = this.$route.params.deviceLocation as string

    this.image = JSON.parse(imageStringified)
    this.deviceLocation = JSON.parse(deviceLocationStringified)
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

        await Axios.post('https://mapovanie.hybridlab.dev/cms/api/entities', {
          type: 'bench',
          sub_type: 'bench',
          longitude,
          latitude,
          device_uuid: deviceInfo.uuid,
          image: this.image.dataUrl,
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

<style lang="scss" scoped>
.form-img::part(image) {
  border-radius: 15%;
}
</style>
