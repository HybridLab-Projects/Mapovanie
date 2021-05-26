<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profil</ion-title>
        <ion-buttons slot="end">
          <ion-button slot="icon-only" router-link="/settings">
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="ion-padding-horizontal">
        <ion-item lines="none">
          <ion-avatar slot="start">
            <img :src="user?.avatar">
          </ion-avatar>
          <ion-label>
            <p class="group-text">
              {{ user?.name }}
            </p>
            <p class="member-text">
              Používateľ
            </p>
          </ion-label>
        </ion-item>
        <p class="ion-margin">
          {{ user?.description }}
        </p>
        <div class="flex justify-between">
          <div class="flex flex-col items-center w-1/2">
            <h1 class="text-4xl font-semibold">
              {{ user?.entities_count }}
            </h1>
            <p class="font-semibold">
              Príspevkov
            </p>
          </div>
          <div class="divider" />
          <div class="flex flex-col items-center w-1/2">
            <h1 class="text-4xl font-semibold">
              {{ user?.groups_count }}
            </h1>
            <p class="font-semibold">
              Skupín
            </p>
          </div>
        </div>
      </div>
      <div class="px-4 pt-6 pb-4">
        <ion-segment v-model="segmentValue" value="entities">
          <ion-segment-button value="entities">
            <ion-label>Objekty</ion-label>
          </ion-segment-button>
          <ion-segment-button value="groups">
            <ion-label>Skupiny</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
      <div v-if="segmentValue === 'entities'">
        <div v-if="user?.entities?.length">
          <a-card
            v-for="entity in user?.entities"
            :key="entity.id"
            :entity="entity"
          />
        </div>
        <div v-else>
          <p class="text-gray-400 text-center">
            Zatiaľ nemáte žiadne príspevky.
          </p>
        </div>
      </div>
      <div v-if="segmentValue === 'groups'">
        <div v-if="userGroups.length">
          <a-group-item
            v-for="group in userGroups"
            :key="group.id"
            :group="group"
          />
        </div>
        <div v-else>
          <p class="text-gray-400 text-center">
            Zatiaľ nie ste v žiadnych skupinách.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonSegment, IonSegmentButton,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { locationOutline, mapOutline, settingsOutline } from 'ionicons/icons'
import ACard from '@/plugins/app/_components/a-card.vue'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import store from '@/plugins/app/_config/store'
import { Group } from '@/plugins/app/_config/types'
import Axios from 'axios'
import AGroupItem from '@/plugins/app/_components/a-group-item.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    AGroupItem,
    ACard,
    IonPage,
    IonContent,
    IonAvatar,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      settingsOutline,
      segmentValue: 'entities',
      userGroups: [] as Group[],
    }
  },
  computed: {
    ...mapState(['user']),
  },
  async mounted() {
    store.dispatch('setUserLocation')

    const userGroups = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/my-groups')
    this.userGroups = userGroups.data.data
  },
  methods: {
    ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchUserinfo')
      await store.dispatch('setUserLocation')

      const userGroups = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/my-groups')
      this.userGroups = userGroups.data.data

      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
})

</script>

<style lang="postcss" scoped>
ion-avatar {
  height: 40px;
  width: 40px;
}

.group-text {
  @apply text-base font-bold m-0;

  color: var(--ion-text-color);
}

.member-text {
  @apply font-semibold mb-1 text-sm;
}

ion-item {
  --inner-padding-top: 0.2rem;
  --inner-padding-bottom: 0.2rem;
}

.divider {
  border-left: 0.5px #c8c7cc solid;
}

@media (prefers-color-scheme: dark) {
  .divider {
    border: 0.5px #404040 solid;
  }
}
</style>
