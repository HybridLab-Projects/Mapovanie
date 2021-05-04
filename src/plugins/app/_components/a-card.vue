<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
  >
    <ion-card-content class="flex">
      <ion-avatar class="ion-margin-end">
        <img src="https://www.visitbratislava.com/wp-content/uploads/2018/07/bratislava-logo-official-square-stvorec-plnofarebne-full-color-cervene-pozadie-red-background.png">
      </ion-avatar>
      <div class="flex flex-col top-container">
        <p class="top-label">
          Mesto Bratislava &#9679; Skate Park
        </p>
        <p>
          Pridal <strong>{{ entity.author.name }}</strong>
        </p>
      </div>
    </ion-card-content>
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-content class="flex ion-justify-content-between">
      <p>{{ distanceFromObject }} km od teba</p>
      <p>{{ when }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
/* eslint-disable no-mixed-operators */

import { defineComponent, PropType } from 'vue'
import { Entity } from '@/plugins/app/_config/types'
import {
  IonCard, IonCardContent, IonImg, IonAvatar,
} from '@ionic/vue'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { GeolocationPosition } from '@capacitor/core'
import { DateTime } from 'luxon'

export default defineComponent({
  name: 'ACard',
  components: {
    IonCard,
    IonCardContent,
    IonImg,
    IonAvatar,
  },
  props: {
    entity: {
      type: Object as PropType<Entity>,
      required: true,
    },
    userLocation: {
      type: Object as PropType<GeolocationPosition>,
      required: true,
    },
  },
  data() {
    return {
      locationOutline,
      mapOutline,
    }
  },
  computed: {
    distanceFromObject(): number {
      if (!this.entity.lat || !this.entity.lon
          || !this.userLocation?.coords?.latitude || !this.userLocation?.coords?.longitude) return 0
      const p = 0.017453292519943295 // Math.PI / 180
      const c = Math.cos
      const a = 0.5 - c((+this.entity.lat - this.userLocation.coords.latitude) * p) / 2
            + c(this.userLocation.coords.latitude * p) * c(+this.entity.lat * p)
            * (1 - c((+this.entity.lon - this.userLocation.coords.longitude) * p)) / 2

      return Math.round(12742 * Math.asin(Math.sqrt(a)) * 10) / 10 // 2 * R; R = 6371 km
    },
    when(): string|null {
      return DateTime.fromFormat(this.entity.updated_at, 'yyyy-MM-dd hh:mm:ss').toRelative({ locale: 'sk' })
    },
  },
})
</script>

<style lang="postcss" scoped>
.top-label {
  margin-bottom: auto !important;
}

.top-container {
  padding: 0.2rem 0;
}

ion-card-content {
  padding: 1rem;
}

p {
  margin: 0;
}
</style>
