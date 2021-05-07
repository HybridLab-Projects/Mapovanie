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
      <div class="flex ion-justify-content-start ion-margin-top">
        <ion-avatar class="h-16 w-16">
          <img :src="user.avatar">
        </ion-avatar>

        <ion-list class="ml-2">
          <ion-item lines="none">
            <p class="ion-text-center text-2xl">
              {{ user.name }}
            </p>
          </ion-item>

          <ion-item lines="none">
            <div slot="start">
              <p>Prispevky</p>
              <p class="ion-text-center">
                0
              </p>
            </div>
            <div>
              <p>Skupiny</p>
              <p class="ion-text-center">
                0
              </p>
            </div>
          </ion-item>
        </ion-list>
      </div>

      <h6 class="ion-no-margin ion-text-left">
        🏫 OANBA<br>
        📍 Pozsony / Fél<br>
        ♀  She / Her<br>
        🎵 Tublatanka, Darina Rolinsova, Szélenä Gomész, Bódi Csabi
      </h6>
      <h5 class="ion-margin-top text-xl">
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
  IonList,
  IonItem,
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
    IonList,
    IonItem,
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
