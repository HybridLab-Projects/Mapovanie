<template>
  <ion-page>
    <i-header title="Nastavenia" />
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>Jazyk</ion-label>
          <ion-select
            value="sk"
            placeholder="Jazyk"
          >
            <ion-select-option value="sk">
              Slovenčina
            </ion-select-option>
            <ion-select-option value="eng">
              English
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item router-link="/settings/qna">
          <ion-label>
            Otázky a odpovede
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  name: 'Settings',
  //   data() {
  //       return {
  //       },
  //   },
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
});
</script>

<style lang="scss" scoped>
</style>
