<template>
  <ion-page>
    <a-header back :title="category?.full_name || 'Objekt'" />
    <ion-content class="ion-padding">
      <ion-img :src="category?.icon" />
      <h1 class="ion-margin-vertical">
        Ako fotiť?
      </h1>
      <p>
        A great food photograph can do a lot of things! It can make a viewer hungry, it can
        convince a diner to order a dish and it can sell a hell of a lot of food and recipe books.
        Knowing how to photograph food to get great results requires a specific knowledge of
      </p>
    </ion-content>
    <ion-footer>
      <!-- <ion-item lines="none">
        <ion-checkbox
          slot="start"
          color="dark"
        />
        <ion-label>Už nezobrazovať</ion-label>
      </ion-item> -->
      <ion-button
        expand="block"
        class="ion-margin"
        @click="takePicture()"
      >
        Ďalej
      </ion-button>
    </ion-footer>
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
  alertController,
} from '@ionic/vue'
import { Category } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Tutorial',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
    IonImg,
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
