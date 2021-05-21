<template>
  <ion-page>
    <a-header title="Užívateľ" back />
    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>

      <div>
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
          Mapovanie pekných design domov  #apartmentlivingroom #apartmentliving
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
      <div class="ion-margin-vertical w-full divider-horizontal" />
      <div v-if="user?.entities?.length">
        <a-card
          v-for="entity in user?.entities"
          :key="entity.id"
          :entity="entity"
        />
      </div>
      <div v-else>
        <p class="text-gray-400 text-center">
          Nemáte zatiaľ žiadne príspevky.
        </p>
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
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { LeaderboardUser, User } from '@/plugins/app/_config/types'
import ACard from '@/plugins/app/_components/a-card.vue'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import store from '@/plugins/app/_config/store'
import Axios from 'axios'

export default defineComponent({
  name: 'User',
  components: {
    ACard,
    IonPage,
    IonContent,
    IonAvatar,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonItem,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      id: '0',
      user: {} as User,
    }
  },
  mounted() {
    store.dispatch('setUserLocation')
  },
  async ionViewWillEnter() {
    this.id = this.$route.params.id as string

    const user = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/users/${this.id}`)
    this.user = user.data.data
  },
  methods: {
    ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchUserinfo')
      await store.dispatch('setUserLocation')

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

.divider-horizontal {
  border-bottom: 0.5px #c8c7cc solid;
}

@media (prefers-color-scheme: dark) {
  .divider {
    border: 0.5px #404040 solid;
  }
}
</style>
