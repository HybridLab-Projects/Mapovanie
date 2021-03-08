<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content>
      <ion-list-header class="ion-margin-bottom">
        Obľúbené
      </ion-list-header>
      <ion-list
        v-for="(entity, i) in favEntities"
        :key="i"
      >
        <ion-item @click="takePicture()">
          <ion-avatar slot="start">
            <img :src="`https://avatars.dicebear.com/4.5/api/male/${entity.id}.svg`">
          </ion-avatar>
          <ion-icon
            slot="end"
            :icon="star"
          />
          <ion-label>
            <h2>{{ entity.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list-header class="ion-margin-bottom">
        Ostatné
      </ion-list-header>
      <ion-list
        v-for="(entity, i) in otherEntities"
        :key="i"
      >
        <ion-item @click="takePicture()">
          <ion-avatar slot="start">
            <img :src="`https://avatars.dicebear.com/4.5/api/male/${entity.id}.svg`">
          </ion-avatar>
          <ion-label>
            <h2>{{ entity.name }}</h2>
          </ion-label>
          <ion-icon
            slot="end"
            :icon="starOutline"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Camera from '@/plugins/capacitor/camera';
import Geolocation from '@/plugins/capacitor/geolocation';

import {
  IonPage,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  alertController,
} from '@ionic/vue';

import {
  starOutline,
  star,
} from 'ionicons/icons';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
  },
  setup() {
    return {
      starOutline,
      star,
    };
  },
  data() {
    return {
      favEntities: [
        {
          id: 1,
          name: 'lavička',
        },
        {
          id: 2,
          name: 'kôš',
        },
        {
          id: 3,
          name: 'stôl',
        },
      ],
      otherEntities: [
        {
          id: 4,
          name: 'tenisové ihrisko',
        },
        {
          id: 5,
          name: 'pinpongový stôl',
        },
        {
          id: 6,
          name: 'detské ihrisko',
        },
        {
          id: 7,
          name: 'futbalove ihrisko',
        },
        {
          id: 8,
          name: 'basketbalove ihrisko',
        },
      ],
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
        const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Error',
            message: err.message,
            buttons: ['OK'],
          });
        await alert.present();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
