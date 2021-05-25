<template>
  <ion-page>
    <a-header back :title="category?.full_name || 'Objekt'" />
    <ion-content class="ion-padding ion-text-center">
      <ion-img
        :src="require('./img/tutorial.svg')"
        class="ion-margin-bottom w-4/5 mx-auto"
      />

      <ion-text class="text-3xl">
        <h1>{{ category?.full_name }}</h1>
      </ion-text>
      <ion-text>
        <p class="mt-6 ion-padding-bottom">
          {{ category?.tutorial }}
        </p>
      </ion-text>
      <ion-button
        expand="block"
        @click="takePicture()"
      >
        Rozumiem
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Camera from '@/plugins/jakub@capacitor/camera'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'

import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonImg,
  // IonItem,
  // IonLabel,
  // IonCheckbox,
  alertController, IonText,
} from '@ionic/vue'
import { Category } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Tutorial',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonImg,
    IonText,
    // IonItem,
    // IonLabel,
    // IonCheckbox,
  },
  data() {
    return {
      categoryId: '0',
      groupId: '0',
    }
  },
  ionViewWillEnter() {
    this.groupId = this.$route.params.groupId as string
    this.categoryId = this.$route.params.categoryId as string
  },
  computed: {
    category(): Category|undefined {
      return this.$store.getters.getCategoryById(this.groupId, this.categoryId)
    },
  },
  methods: {
    async takePicture() {
      try {
        const photo = await Camera.getFullPhoto()
        const deviceLocation = await Geolocation.getDeviceLocation()

        await this.$router.push({
          name: 'Form',
          params: {
            image: JSON.stringify(photo),
            deviceLocation: JSON.stringify(deviceLocation),
            groupId: this.groupId,
            categoryId: this.categoryId,
          },
        })
      } catch (err) {
        console.log(err)
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
