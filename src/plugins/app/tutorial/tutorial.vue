<template>
  <ion-page>
    <i-header title="Mapovanie" />
    <ion-content class="ion-padding">
      <ion-img :src="require('./img/tutorial.svg')" />
      <h1>Ako fotiť?</h1>
      <p>
        A great food photograph can do a lot of things! It can make a viewer hungry, it can
        convince a diner to order a dish and it can sell a hell of a lot of food and recipe books.
        Knowing how to photograph food to get great results requires a specific knowledge of
      </p>
    </ion-content>
    <ion-footer>
      <ion-item lines="none">
        <ion-checkbox
          slot="start"
          color="dark"
        />
        <ion-label>Uz nezobrazovat</ion-label>
      </ion-item>
      <ion-button
        expand="block"
        class="ion-margin"
        router-link="/tabs"
      >
        Ďalej
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonImg,
  IonItem,
  IonLabel,
  IonCheckbox,
} from '@ionic/vue';

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonFooter,
    IonImg,
    IonItem,
    IonLabel,
    IonCheckbox,
  },
});
</script>

<style lang="scss" scoped>
</style>
