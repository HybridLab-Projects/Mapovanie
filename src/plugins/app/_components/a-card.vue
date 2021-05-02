<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
  >
    <ion-card-content class="d-flex">
      <ion-avatar class="ion-margin-end">
        <img src="https://bratislava.blob.core.windows.net/media/Default/Dokumenty/Str%C3%A1nky/logoBA_1%20colour_centr_neg.jpg">
      </ion-avatar>
      <div class="d-flex flex-column top-container">
        <p class="top-label">
          Mesto Bratislava &#9679; Skate Park
        </p>
        <p>
          Pridal <strong>{{ entity.author.name }}</strong>
        </p>
      </div>
    </ion-card-content>
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-content class="d-flex ion-justify-content-between">
      <p>1.4 km od teba</p>
      <p>Pred 2 dňami</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import { Entity } from '@/plugins/app/_config/types'
import {
  IonCard, IonCardContent, IonImg, IonAvatar,
} from '@ionic/vue'
import { locationOutline, mapOutline } from 'ionicons/icons'

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
  },
  data() {
    return {
      locationOutline,
      mapOutline,
    }
  },
})
</script>

<style lang="scss" scoped>
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
