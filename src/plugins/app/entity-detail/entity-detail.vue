<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title v-if="entity?.type === 'bench'">
          Lavička
        </ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon
              slot="icon-only"
              :icon="flagOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-img
        :src="entity?.images[0]?.url"
      />
      <div class="ion-padding">
        <ion-text>
          <h6 class="ion-color-danger">
            {{ entity?.lon }} {{ entity?.lat }}
          </h6>
          <h1
            v-if="entity?.type === 'bench'"
            class="ion-no-margin"
          >
            Lavička
          </h1>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonImg,
  IonText,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
} from '@ionic/vue';

import { flagOutline } from 'ionicons/icons';
import { Entity } from '@/plugins/app/_config/types';

export default defineComponent({
  name: 'EntityDetail',
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonText,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
  },
  data() {
    return {
      flagOutline,
      id: '0',
    };
  },
  computed: {
    entity(): Entity|undefined {
      return this.$store.getters.getEntity(this.id);
    },
  },
  ionViewWillEnter() {
    this.id = this.$route.params.id as string;
  },
});
</script>

<style lang="scss">

</style>
