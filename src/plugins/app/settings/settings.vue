<template>
  <ion-page>
    <i-header title="Nastavenia" />
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Jazyk</ion-label>
          <ion-select
            v-model="lang"
            value="sk"
            placeholder="Jazyk"
            @ionChange="log"
          >
            <ion-select-option value="sk">
              Slovenčina
            </ion-select-option>
            <ion-select-option value="en">
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
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';

export default defineComponent({
  name: 'Settings',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      lang: 'sk',
    };
  },
  methods: {
    log() {
      console.log(this.lang);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
