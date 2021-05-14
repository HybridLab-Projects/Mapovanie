<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
    class="object-card"
  >
    <ion-card-content class="flex card-content">
      <ion-avatar class="ion-margin-end ion-align-self-center card-avatar">
        <img :src="entity.category.group.image.url">
      </ion-avatar>
      <div class="flex flex-col w-full">
        <ion-text color="dark">
          <p class="font-bold">
            {{ entity.category.group?.name }} &#9679; {{ entity.category.full_name }}
          </p>
        </ion-text>
        <ion-text color="medium">
          <p>{{ distanceFromObject }} km od teba &#9679; {{ when }}</p>
        </ion-text>
      </div>
    </ion-card-content>
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-content class="card-content">
      <ion-label color="dark">
        <p>
          {{ entity?.description.slice(0, 50).trim() }}...
        </p>
      </ion-label>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
/* eslint-disable no-mixed-operators */

import { defineComponent, PropType } from 'vue'
import { Entity } from '@/plugins/app/_config/types'
import {
  IonCard, IonCardContent, IonImg, IonAvatar, IonText, IonLabel,
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
    IonText,
    IonLabel,
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
.card-content {
  padding: 1rem;
}

p {
  margin: 0;
}

.object-card {
  border-radius: 0;
  margin: 0 0 1rem;
}

.card-avatar {
  height: 40px;
  width: 40px;
}

@media (prefers-color-scheme: dark) {
  .object-card {
    box-shadow: none;
  }
}
</style>
