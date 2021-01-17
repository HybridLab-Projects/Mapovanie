<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Pridať strom</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-img
        :src="image.webPath"
        class="ion-padding form-img"
        @click="retakePicture()"
      />
      <div class="tree-container ion-margin">
        <ion-button
          slot="icon-only"
          class="leaf-tree"
          :class="
            treeType === 'leaf' ? 'leaf-tree-selected' : 'tree-unselected'
          "
          @click="treeType = 'leaf'"
        >
          <ion-icon
            src="/assets/icon/leaf-tree.svg"
            class="tree-icon"
          />
        </ion-button>
        <ion-button
          slot="icon-only"
          class="fir-tree"
          :class="treeType === 'fir' ? 'fir-tree-selected' : 'tree-unselected'"
          @click="treeType = 'fir'"
        >
          <ion-icon
            src="/assets/icon/fir-tree.svg"
            class="tree-icon"
          />
        </ion-button>
      </div>
    </ion-content>
    <ion-button
      expand="block"
      class="submit-button ion-margin"
      :disabled="!treeType"
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
  IonIcon,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';
import Axios from 'axios';

import {
  Plugins, CameraResultType, GeolocationPosition, CameraPhoto,
} from '@capacitor/core';

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
    IonIcon,
    IonButtons,
    IonBackButton,
  },
  data() {
    return {
      image: {} as CameraPhoto,
      deviceLocation: {} as GeolocationPosition,
      treeType: '',
    };
  },
  ionViewWillEnter() {
    this.treeType = '';
    const imageStringified = this.$route.params.image as string;
    const deviceLocationStringified = this.$route.params.deviceLocation as string;
    const image = JSON.parse(imageStringified);
    const deviceLocation = JSON.parse(deviceLocationStringified);
    this.image = image;
    this.deviceLocation = deviceLocation;
  },
  methods: {
    async retakePicture() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
        });
        const deviceLocation = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 2000,
        });
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
        if (
          !this.treeType
|| !this.deviceLocation.coords.longitude
|| !this.deviceLocation.coords.latitude
|| !deviceInfo.uuid
|| !this.image.dataUrl
        ) {
          throw new Error('Error');
        }
        await Axios.post('https://mapovanie.hybridlab.dev/cms/api/entities', {
          type: 'tree',
          // eslint-disable-next-line @typescript-eslint/camelcase
          sub_type: this.treeType,
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

.leaf-tree {
  --border-radius: 15%;
  --background: var(--ion-color-success-tint);
  height: 38vw;
  width: 38vw;
}

.fir-tree {
  --border-radius: 15%;
  --background: var(--ion-color-danger-tint);
  height: 38vw;
  width: 38vw;
}

.tree-container {
  display: flex;
  justify-content: space-between;
}

.leaf-tree-selected {
  --box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  --background: var(--ion-color-success-shade);
}

.fir-tree-selected {
  --box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  --background: var(--ion-color-danger-shade);
}

.tree-unselected {
  --box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.tree-icon {
  color: #000;
  font-size: 96px;
}
</style>
