<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
  >
    <ion-card-content class="flex">
      <ion-avatar class="ion-margin-end ion-align-self-center">
        <img src="https://www.visitbratislava.com/wp-content/uploads/2018/07/bratislava-logo-official-square-stvorec-plnofarebne-full-color-cervene-pozadie-red-background.png">
      </ion-avatar>
      <div class="flex flex-col top-container">
        <p class="top-label">
          {{ entity.category.group.name }} &#9679; {{ entity.category.full_name }}
        </p>
        <p>
          Pridal <strong>Mark Mucska</strong>
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
import LocationHelper from '@/plugins/jakub@capacitor/geolocation/_helpers'

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
      return LocationHelper.calculateDistance(this.entity, this.userLocation)
    },
    when(): string|null {
      return DateTime.fromISO(this.entity.updated_at).toRelative({ locale: 'sk' })
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
