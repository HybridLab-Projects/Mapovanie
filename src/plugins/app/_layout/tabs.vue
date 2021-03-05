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
          <ion-icon :icon="listOutline" />
          <ion-label>Najnovšie</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="camera"
          href="/tabs/category"
        >
          <ion-icon :icon="camera" />
          <ion-label />
        </ion-tab-button>

        <ion-tab-button
          tab="profile"
          href="/tabs/profile"
        >
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="settings"
          href="/tabs/settings"
        >
          <ion-icon :icon="settings" />
          <ion-label>Nastavenia</ion-label>
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
import {
  ellipse, triangle, settings, camera, personCircleOutline, listOutline,
} from 'ionicons/icons';

export default defineComponent({
  name: 'Tabs',
  components: {
    IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage,
  },
  setup() {
    return {
      ellipse,
      triangle,
      settings,
      camera,
      personCircleOutline,
      listOutline,
    };
  },
});
</script>
