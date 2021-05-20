<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="latest" href="/tabs/latest">
          <ion-icon :src="require('./img/latest.svg')" />
          <ion-label>Najnovšie</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="groups" href="/tabs/groups">
          <ion-icon :src="require('./img/groups.svg')" />
          <ion-label>Skupiny</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="categories" href="/tabs/categories">
          <ion-icon :src="require('./img/camera.svg')" />
          <ion-label>Odfotiť</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="map" href="/tabs/map">
          <ion-icon :src="require('./img/map.svg')" />
          <ion-label>Moja mapa</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :src="require('./img/profile.svg')" />
          <ion-label>Profil</ion-label>
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
  people, map, camera, list, personCircle,
} from 'ionicons/icons'

export default defineComponent({
  name: 'Tabs',
  components: {
    IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage,
  },
  data() {
    return {
      people,
      map,
      camera,
      list,
      personCircle,
    }
  },
})
</script>
