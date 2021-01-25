<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Pridať lavičku</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-img
        :src="image.webPath"
        class="ion-padding form-img"
        @click="retakePicture()"
      />
    </ion-content>
    <ion-button
      expand="block"
      class="submit-button ion-margin"
      @click="submit()"
    >
      Odoslať
    </ion-button>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  loadingController,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';
import Axios from 'axios';

import {
  Plugins, CameraResultType, GeolocationPosition, CameraPhoto,
} from '@capacitor/core';
import Helpers from '@/plugins/app/_helpers';

const { Camera, Device, Geolocation } = Plugins;
export default defineComponent({
  name: 'Form',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonButton,
    IonButtons,
    IonBackButton,
  },
  data() {
    return {
      image: {} as CameraPhoto,
      deviceLocation: {} as GeolocationPosition,
    };
  },
  ionViewWillEnter() {
    const imageStringified = this.$route.params.image as string;
    const deviceLocationStringified = this.$route.params.deviceLocation as string;

    this.image = JSON.parse(imageStringified);
    this.deviceLocation = JSON.parse(deviceLocationStringified);
  },
  methods: {
    async retakePicture() {
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

        if (!image?.webPath) return;
        console.log('before base64', image);
        image.dataUrl = await Helpers.getBase64FromBlobUrl(image.webPath, image.format);
        console.log('after base64', image);

        this.image = image;
        this.deviceLocation = deviceLocation;
      } catch (err) {
        console.log(err);
      }
    },
    async submit() {
      const loading = await loadingController.create({
        message: 'Odosielam...',
      });
      try {
        await loading.present();
        const deviceInfo = await Device.getInfo();
        if (!this.deviceLocation.coords.longitude
            || !this.deviceLocation.coords.latitude
            || !deviceInfo.uuid
            || !this.image.dataUrl
        ) {
          throw new Error('Error');
        }
        await Axios.post('https://mapovanie.hybridlab.dev/cms/api/entities', {
          type: 'bench',
          // eslint-disable-next-line @typescript-eslint/camelcase
          sub_type: 'bench',
          longitude: this.deviceLocation.coords.longitude,
          latitude: this.deviceLocation.coords.latitude,
          // eslint-disable-next-line @typescript-eslint/camelcase
          device_uuid: deviceInfo.uuid,
          image: this.image.dataUrl,
        });
        await loading.dismiss();

        this.$router.push({
          name: 'Success',
        });
      } catch (err) {
        console.log(err);

        await loading.dismiss();

        this.$router.push({
          name: 'Fail',
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.form-img::part(image) {
  border-radius: 15%;
}
</style>
