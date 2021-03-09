<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons
        v-if="back"
        slot="start"
      >
        <ion-back-button />
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
} from '@ionic/vue';

export default defineComponent({
  name: 'Tabs',
  components: {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
