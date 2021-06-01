<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Skupiny</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Skupiny
          </ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar v-model="search" placeholder="Vyhľadaj" />
        </ion-toolbar>
        <ion-toolbar>
          <ion-segment v-model="value">
            <ion-segment-button value="my">
              <ion-label class="font-semibold">
                Moje
              </ion-label>
            </ion-segment-button>
            <ion-segment-button value="other">
              <ion-label class="font-semibold">
                Nájsť
              </ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>

      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>

      <div v-if="value === 'my'">
        <ion-list v-if="searchedGroups.length">
          <a-group-item
            v-for="group in searchedGroups"
            :key="group.id"
            :group="group"
          />
        </ion-list>
        <div v-else>
          <h2 class="text-gray-400 ion-margin-top ion-text-center">
            Nie ste v žiadnych skupinách.
          </h2>
        </div>
      </div>
      <div v-if="value === 'other'">
        <ion-list v-if="searchedGroups.length">
          <a-group-item
            v-for="group in searchedGroups"
            :key="group.id"
            :group="group"
          />
        </ion-list>
        <div v-else>
          <h2 class="text-gray-400 ion-margin-top ion-text-center">
            Nie sú dostupné žiadne skupiny.
          </h2>
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
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
  IonRefresherContent,
  IonRefresher,
  IonList,
} from '@ionic/vue'

import AGroupItem from '@/plugins/app/_components/a-group-item.vue'
import { Group, User } from '@/plugins/app/_config/types'
import Axios from 'axios'

export default defineComponent({
  name: 'Groups',
  components: {
    AGroupItem,
    IonPage,
    IonContent,
    IonTitle,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonRefresher,
    IonRefresherContent,
    IonList,
  },
  data() {
    return {
      value: 'my',
      otherGroups: [] as Group[],
      search: '',
    }
  },
  computed: {
    myGroups(): Group[] {
      return this.$store.state.groups
    },
    user(): User {
      return this.$store.state.user
    },
    searchedGroups(): Group[] {
      const currentGroups = this.value === 'my' ? this.myGroups : this.otherGroups
      return currentGroups.filter((group) => group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    },
  },
  async ionViewWillEnter() {
    const otherGroups = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/groups')
    this.otherGroups = otherGroups.data.data
  },
  methods: {
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchGroups')
      const otherGroups = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/groups')
      this.otherGroups = otherGroups.data.data
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
})

</script>
