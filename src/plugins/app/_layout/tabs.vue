<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="segments"
          href="/tabs/latest"
        >
          <ion-icon :icon="list" />
          <ion-label>Najnovšie</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="map"
          href="/tabs/map"
        >
          <ion-icon :icon="map" />
          <ion-label>Mapa</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="home"
          href="/tabs/home"
        >
          <ion-icon :icon="camera" />
          <ion-label>Pridať</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="profile"
          href="/tabs/profile"
        >
          <ion-icon :icon="personCircle" />
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
import { defineComponent } from 'vue'

import {
  IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage,
} from '@ionic/vue'
import {
  settings, map, camera, list, personCircle,
} from 'ionicons/icons'

export default defineComponent({
  name: 'Tabs',
  components: {
    IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage,
  },
  data() {
    return {
      settings,
      map,
      camera,
      list,
      personCircle,
    }
  },
})
</script>
