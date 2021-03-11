<template>
  <ion-nav
    ref="ionNav"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IonNav } from '@ionic/vue';

import EntityReport from './entity-report.vue';

export default defineComponent({
  name: 'EntityReportNav',
  components: {
    IonNav,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    const ionNav = document.querySelector('ion-nav') as HTMLIonNavElement;
    ionNav.setRoot(EntityReport);
  },
});
</script>
