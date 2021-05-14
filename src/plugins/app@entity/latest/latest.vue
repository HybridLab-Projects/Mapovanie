<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Príspevky</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullcreen="true">
      <ion-header collapse="condense">
        <ion-toolbar class="ion-padding-bottom">
          <ion-title size="large">
            Príspevky
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="card-bg">
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
.card-bg {
  background-color: #f0f3fa;
}
</style>
