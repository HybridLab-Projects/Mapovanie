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

<script>
import { defineComponent } from 'vue'

import {
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/vue'

export default defineComponent({
  name: 'OtherGroups',
  components: {
    IonAvatar,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      groups: {
        KrcmaBA: {
          id: 4,
          name: 'Krcma',
          badge: 'Volny cas',
          members: 435,
        },
        ShoppingCentre: {
          id: 5,
          name: 'Shopping Center',
          badge: 'Shopping',
          members: 5423,
        },
        BratislavaPools: {
          id: 6,
          name: 'Bazeny',
          badge: 'Sport',
          members: 233,
        },
        Kalistenika: {
          id: 7,
          name: 'Kalistenika',
          badge: 'Sport',
          members: 3456,
        },
        DownhillBike: {
          id: 8,
          name: 'DownhillBike',
          badge: 'Sport',
          members: 3456,
        },
      },
    }
  },
})
</script>
