<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content>
      <ion-list-header>
        Obľúbené
      </ion-list-header>
      <ion-list
        v-for="(entity, i) in favEntities"
        :key="i"
      >
        <ion-item>
          <ion-avatar slot="start">
            <img :src="`https://avatars.dicebear.com/4.5/api/male/${entity.id}.svg`">
          </ion-avatar>
          <ion-icon
            slot="end"
            :icon="starOutline"
          />
          <ion-label>
            <h1>{{ entity.name }}</h1>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list-header>
        Ostatné
      </ion-list-header>
      <ion-list
        v-for="(entity, i) in otherEntities"
        :key="i"
      >
        <ion-item>
          <ion-avatar slot="start">
            <img :src="`https://avatars.dicebear.com/4.5/api/male/${entity.id}.svg`">
          </ion-avatar>
          <ion-icon
            slot="end"
            :icon="starOutline"
          />
          <ion-label>
            <h1>{{ entity.name }}</h1>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
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
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
