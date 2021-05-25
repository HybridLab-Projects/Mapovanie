<template>
  <ion-page />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage } from '@ionic/vue'

export default defineComponent({
  name: 'Index',
  components: {
    IonPage,
  },
  async mounted() {
    await this.$store.dispatch('appLoad')
  },
})
</script>
