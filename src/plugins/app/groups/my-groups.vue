<template>
  <ion-item v-for="(group, i) in groups" :key="i">
    <ion-avatar slot="start">
      <img :src="`https://avatars.dicebear.com/api/identicon/${group.id}.svg`">
    </ion-avatar>
    <ion-label>
      <h2>{{ group.name }}</h2>
      <ion-badge color="warning">
        {{ group.badge }}
      </ion-badge>
      <p>{{ group.members }}</p>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/vue'

export default defineComponent({
  name: 'MyGroups',
  components: {
    IonAvatar,
    IonItem,
    IonLabel,
    IonBadge,
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
