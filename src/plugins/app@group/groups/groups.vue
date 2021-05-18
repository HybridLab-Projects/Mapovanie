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
            <ion-segment-button value="my">
              <ion-label>Moje</ion-label>
            </ion-segment-button>
            <ion-segment-button value="other">
              <ion-label>Nájsť</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>
        <div v-if="value === 'my'">
          <div v-if="myGroups.length === 0">
            <no-content />
          </div>
          <div v-else>
            <a-group-item
                v-for="group in myGroups "
                :key="group.id"
                :group="group"
            />
          </div>
        </div>
        <div v-if="value === 'other'">
          <div v-if="otherGroups.length === 0">
            <no-content />
          </div>
          <div v-else>
            <a-group-item
                v-for="group in otherGroups"
                :key="group.id"
                :group="group"
            />
          </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
import noContent from '@/plugins/app@group/no-content/no-content.vue'
import { Group, User } from '@/plugins/app/_config/types'
import Axios from 'axios'

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
    noContent,
  },
  data() {
    return {
      value: 'my',
      otherGroups: [] as Group[],
    }
  },
  computed: {
    myGroups(): Group[] {
      return this.$store.state.groups
    },
    user(): User {
      return this.$store.state.user
    },
  },
  async ionViewWillEnter() {
    const otherGroups = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/groups')
    this.otherGroups = otherGroups.data.data
  },
})

</script>
