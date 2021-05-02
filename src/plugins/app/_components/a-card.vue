<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
  >
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-header>
      <ion-card-subtitle class="d-flex">
        <ion-icon
          :icon="locationOutline"
          size="small"
          class="mr-1"
        />
        <span class="ion-align-self-center">{{ entity?.address?.split(',')[0] }}</span>
      </ion-card-subtitle>
      <ion-card-title
        class="d-flex ion-margin-top"
      >
        <ion-icon
          :icon="mapOutline"
          size="large"
          class="ion-margin-end"
        />
        <span class="ion-align-self-center">{{ entity?.category.full_name }}</span>
      </ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import { Entity } from '@/plugins/app/_config/types'
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg,
} from '@ionic/vue'
import { locationOutline, mapOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'ACard',
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonIcon,
  },
  props: {
    entity: {
      type: Object as PropType<Entity>,
      required: true,
    },
  },
  data() {
    return {
      locationOutline,
      mapOutline,
    }
  },
})
</script>

<style lang="scss">

</style>
