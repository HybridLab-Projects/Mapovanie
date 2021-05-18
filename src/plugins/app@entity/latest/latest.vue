<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Najnovšie</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullcreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Najnovšie
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div v-if="entities.length === 0">
        <no-content />
      </div>
      <div v-else>
        <a-card
            v-for="entity in entities"
            :key="entity.id"
            :entity="entity"
            :user-location="currentLocation"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'
import ACard from '@/plugins/app/_components/a-card.vue'
import noContent from '@/plugins/app@entity/no-content/no-content.vue'
import { Entity } from '@/plugins/app/_config/types'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import { GeolocationPosition } from '@capacitor/core'

export default defineComponent({
  name: 'Latest',
  components: {
    ACard,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    noContent,
  },
  data() {
    return {
      value: 'entities',
      currentLocation: {} as GeolocationPosition,
    }
  },
  computed: {
    entities(): Array<Entity> {
      return this.$store.state.entities
    },
  },
  methods: {
    async doRefresh(e: CustomEvent) {
      // debugger
      await this.$store.dispatch('fetchEntities')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
  async ionViewWillEnter() {
    this.currentLocation = await Geolocation.getDeviceLocation()
  },
})
</script>

<style lang="postcss" scoped>
ion-toolbar {
  background-color: var(--ion-toolbar-background);

  --background: var(--ion-toolbar-background);
}
</style>
