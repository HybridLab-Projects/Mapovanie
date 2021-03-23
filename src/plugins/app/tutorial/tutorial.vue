<template>
  <ion-page>
    <a-header title="Mapovanie" />
    <ion-content class="ion-padding">
      <ion-img :src="require('./img/tutorial.svg')" />
      <h1>Ako fotiť? {{ categoryId }}</h1>
      <p>
        A great food photograph can do a lot of things! It can make a viewer hungry, it can
        convince a diner to order a dish and it can sell a hell of a lot of food and recipe books.
        Knowing how to photograph food to get great results requires a specific knowledge of
      </p>
    </ion-content>
    <ion-footer>
      <ion-item lines="none">
        <ion-checkbox
          slot="start"
          color="dark"
        />
        <ion-label>Už nezobrazovať</ion-label>
      </ion-item>
      <ion-button
        expand="block"
        class="ion-margin"
        @click="takePicture(categoryId)"
      >
        Ďalej
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Camera from '@/plugins/jakub/capacitor/camera'
import Geolocation from '@/plugins/jakub/capacitor/geolocation'

import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonImg,
  IonItem,
  IonLabel,
  IonCheckbox,
  alertController,
} from '@ionic/vue'
import { Category } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
    IonImg,
    IonItem,
    IonLabel,
    IonCheckbox,
  },
  data() {
    return {
      categoryId: '0',
    }
  },
  ionViewWillEnter() {
    if (!this.$route.params.id.length || typeof this.$route.params.id !== 'string') {
      this.$router.push({ name: 'Categories' })
    } else {
      this.categoryId = this.$route.params.id as string
    }
  },
  computed: {
    category(): Category|undefined {
      return this.$store.getters.getCategoryById(this.categoryId)
    },
  },
  methods: {
    async takePicture(categoryId: string) {
      try {
        const photo = await Camera.getFullPhoto()
        const deviceLocation = await Geolocation.getDeviceLocation()

        await this.$router.push({
          name: 'Form',
          params: {
            image: JSON.stringify(photo),
            deviceLocation: JSON.stringify(deviceLocation),
            categoryId,
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

<style lang="scss" scoped>
</style>
