<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Skupiny</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullcreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Príspevky
          </ion-title>
        </ion-toolbar>
        <ion-searchbar show-cancel-button="never" />
        <ion-segment v-model="value">
          <ion-segment-button value="mine">
            <ion-label>Moje</ion-label>
          </ion-segment-button>
          <ion-segment-button value="other">
            <ion-label>Nájsť</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-header>

      <my-groups v-if="value === 'mine'" />
      <other-groups v-if="value === 'other'" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonTitle,
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
} from '@ionic/vue'

import myGroups from '@/plugins/app/groups/my-groups.vue'
import otherGroups from '@/plugins/app/groups/other-groups.vue'

export default {
  name: 'Groups',
  components: {
    IonPage,
    IonContent,
    IonTitle,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    myGroups,
    otherGroups,
  },
  data() {
    return {
      value: 'mine',
    }
  },
}
</script>

<style>

</style>
