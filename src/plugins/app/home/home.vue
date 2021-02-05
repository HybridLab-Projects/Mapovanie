<template>
  <ion-page>
    <i-header title="Mapovanie" />
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

import Camera from '@/plugins/capacitor/camera';
import Geolocation from '@/plugins/capacitor/geolocation';

import { cameraOutline } from 'ionicons/icons';
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';

export default defineComponent({
  name: 'Home',
  components: {
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
        const photo = await Camera.getFullPhoto();
        const deviceLocation = await Geolocation.getDeviceLocation();

        this.$router.push({
          name: 'Form',
          params: {
            image: JSON.stringify(photo),
            deviceLocation: JSON.stringify(deviceLocation),
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
