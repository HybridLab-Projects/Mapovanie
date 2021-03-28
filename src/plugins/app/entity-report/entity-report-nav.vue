<template>
  <ion-nav
    ref="ionNav"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { IonNav } from '@ionic/vue'

import EntityReport from './entity-report.vue'

export default defineComponent({
  name: 'EntityReportNav',
  components: {
    IonNav,
  },
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const ionNav = document.querySelector('ion-nav')
    if (!ionNav) return
    ionNav.setRoot(EntityReport, { entity: this.entity })
  },
})
</script>
