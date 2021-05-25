<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Najnovšie</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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
      <a-card
        v-for="entity in entities"
        :key="entity.id"
        :entity="entity"
      />
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
import store from '@/plugins/app/_config/store'

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
    }
  },
  computed: {
    entities(): Array<Entity> {
      return this.$store.state.entities
    },
  },
  mounted() {
    store.dispatch('setUserLocation')
  },
  methods: {
    async doRefresh(e: CustomEvent) {
      // debugger
      await this.$store.dispatch('fetchEntities')
      await store.dispatch('setUserLocation')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
})
</script>
