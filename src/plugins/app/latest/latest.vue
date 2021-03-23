<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="title">
          Príspevky
        </ion-title>
        <ion-buttons
          v-if="value === 'entities'"
          slot="end"
        >
          <ion-button>
            <ion-icon
              slot="icon-only"
              :icon="filterOutline"
              size="large"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment
          v-model="value"
          value="entities"
        >
          <ion-segment-button
            class="toolbar"
            value="entities"
          >
            <ion-label>Najnovšie</ion-label>
          </ion-segment-button>
          <ion-segment-button
            class="toolbar"
            value="leaderboard"
          >
            <ion-label>Rebríček</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullcreen="true">
      <entities v-if="value === 'entities'" />
      <leaderboard v-if="value === 'leaderboard'" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Entities from '@/plugins/app/latest/entities.vue';
import Leaderboard from '@/plugins/app/latest/leaderboard.vue';

import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/vue';

import { filterOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Latest',
  components: {
    IonPage,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    Entities,
    Leaderboard,
    IonButtons,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      cardCount: 2,
      value: 'entities',
      filterOutline,
    };
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>

@media (prefers-color-scheme: dark) {
  .title {
    --color: #fff;
    text-align: center;
  }
}
@media (prefers-color-scheme: light) {
  .title {
    --color: #000;
    text-align: center;
  }
}

.toolbar {
  width: 100vh;
  height: 45px;
  font-size: 2vh;
}

</style>
