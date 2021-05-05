<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>

  <a-card v-for="entity in entities" :key="entity.id" :entity="entity" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { Entity } from '@/plugins/app/_config/types'
import ACard from '@/plugins/app/_components/a-card.vue'

export default defineComponent({
  name: 'Entities',
  components: {
    ACard,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
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
})
</script>
