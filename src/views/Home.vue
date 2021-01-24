<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mapovanie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-fab
        slot="fixed"
        vertical="bottom"
        horizontal="center"
        class="ion-margin-bottom"
      >
        <ion-fab-button @click="takePicture()">
          <ion-icon :icon="cameraOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Plugins, CameraResultType, Geolocation } from '@capacitor/core';

import Helpers from '@/plugins/app/helpers';

import { cameraOutline } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';

const { Camera } = Plugins;

export default defineComponent({
  name: 'Home',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      cameraOutline,
    };
  },
  methods: {
    async takePicture() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri,
        });

        const deviceLocation = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 2000,
        });
        const test = {
          coords: {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude,
            accuracy: deviceLocation.coords.accuracy,
            altitude: deviceLocation.coords.altitude,
            altitudeAccuracy: deviceLocation.coords.altitudeAccuracy,
            heading: deviceLocation.coords.heading,
            speed: deviceLocation.coords.speed,
          },
          timestamp: deviceLocation.timestamp,
        };

        if (!image?.webPath) return;

        image.dataUrl = await Helpers.getBase64FromBlobUrl(image.webPath, image.format);

        this.$router.push({
          name: 'Form',
          params: {
            image: JSON.stringify(image),
            deviceLocation: JSON.stringify(test),
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
