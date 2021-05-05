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
            Skupiny
          </ion-title>
        </ion-toolbar>
        <!--        <ion-toolbar>-->
        <!--          <ion-searchbar show-cancel-button="never" />-->
        <!--        </ion-toolbar>-->
        <ion-toolbar>
          <ion-segment v-model="value">
            <ion-segment-button value="mine">
              <ion-label>Moje</ion-label>
            </ion-segment-button>
            <ion-segment-button value="other">
              <ion-label>Nájsť</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>

      <div v-if="value === 'mine'">
        <a-group-item v-for="group in myGroups" :key="group.id" :group="group" />
      </div>
      <div v-if="value === 'other'">
        <a-group-item v-for="group in newGroups" :key="group.id" :group="group" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonTitle,
  IonLabel,
  // IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
} from '@ionic/vue'

import AGroupItem from '@/plugins/app/_components/a-group-item.vue'

export default defineComponent({
  name: 'Groups',
  components: {
    AGroupItem,
    IonPage,
    IonContent,
    IonTitle,
    // IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonHeader,
    IonToolbar,
  },
  data() {
    return {
      value: 'mine',
      myGroups: {
        Baksetball_ba: {
          id: 0,
          name: 'Basketball Bratislava',
          badge: 'Sport',
          members: 2354,
        },
        Skate: {
          id: 1,
          name: 'Skate',
          badge: 'Sport',
          members: 345,
        },
        Pingpong: {
          id: 2,
          name: 'Pingpong Bratislava',
          badge: 'Volny cas',
          members: 143,
        },
        StreetFutball: {
          id: 3,
          name: 'Street Futball Bratislava',
          badge: 'Sport',
          members: 645,
        },
      },
      newGroups: {
        KrcmaBA: {
          id: 4,
          name: 'Krcma',
          badge: 'Volny cas',
          members: 435,
        },
        ShoppingCentre: {
          id: 5,
          name: 'Shopping Center',
          badge: 'Shopping',
          members: 5423,
        },
        BratislavaPools: {
          id: 6,
          name: 'Bazeny',
          badge: 'Sport',
          members: 233,
        },
        Kalistenika: {
          id: 7,
          name: 'Kalistenika',
          badge: 'Sport',
          members: 3456,
        },
        DownhillBike: {
          id: 8,
          name: 'DownhillBike',
          badge: 'Sport',
          members: 3456,
        },
      },

    }
  },
})
</script>
