<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="home"
          href="/tabs/home"
        >
          <ion-icon :icon="triangle" />
          <ion-label>Pridať</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="segments"
          href="/tabs/latest"
        >
          <ion-icon :icon="ellipse" />
          <ion-label>Najnovšie</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage,
} from '@ionic/vue';
import { ellipse, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'Tabs',
  components: {
    IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage,
  },
  setup() {
    return {
      ellipse,
      triangle,
    };
  },
});
</script>
