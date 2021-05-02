<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Moje</h2>
      <ion-item v-for="(group, i) in groups" :key="i">
        <ion-avatar slot="start">
          <img src="">
        </ion-avatar>
        <ion-label>
          <h2>{{ group.name }}</h2>
          <h3>{{ group.badge }}</h3>
          <p>{{ group.members }}</p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/vue'

export default defineComponent({
  name: 'MyGroups',
  components: {
    IonContent,
    IonPage,
    IonAvatar,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      groups: {
        Baksetball_ba: {
          id: 0,
          name: 'Basketball Bratislava',
          badge: 'Sport',
          members: 2354,
        },
        Skate: {
          id: 1,
          name: 'Skate',
          badge: 'Sport',
          members: 345,
        },
        Pingpong: {
          id: 2,
          name: 'Pingpong Bratislava',
          badge: 'Volny cas',
          members: 143,
        },
        StreetFutball: {
          id: 3,
          name: 'Street Futball Bratislava',
          badge: 'Sport',
          members: 645,
        },
      },
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
