<template>
  <ion-page>
    <a-header title="Profil" />
    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="flex ion-justify-content-center ion-margin-top">
        <ion-avatar>
          <img :src="user.avatar">
        </ion-avatar>
      </div>
      <h1 class="ion-text-center">
        {{ user.name }}
      </h1>
      <h6 class="ion-no-margin ion-text-center">
        {{ user.points }} 🔥
      </h6>
      <h5 class="posts-title">
        Moje príspevky
      </h5>
      <div v-if="user.entities?.length">
        <a-card
          v-for="entity in user.entities"
          :key="entity.id"
          :entity="entity"
          :user-location="currentLocation"
        />
      </div>
      <div v-else>
        <ion-label color="medium">
          Zatiaľ nemáte žiadne príspevky :(
        </ion-label>
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
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { locationOutline, mapOutline } from 'ionicons/icons'
import ACard from '@/plugins/app/_components/a-card.vue'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'

export default defineComponent({
  name: 'Profile',
  components: {
    ACard,
    IonPage,
    IonContent,
    IonAvatar,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      currentLocation: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchUserinfo')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
  async ionViewWillEnter() {
    this.currentLocation = await Geolocation.getDeviceLocation()
  },

})

</script>

<style lang="postcss" scoped>
ion-avatar {
  height: 10rem;
  width: 10rem;
}

.posts-title {
  margin-top: 2rem;
}
</style>
