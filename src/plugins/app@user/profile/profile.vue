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
                {{ user.entities_count }}
              </p>
            </div>
            <div>
              <p>Skupiny</p>
              <p class="ion-text-center">
                -
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
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { locationOutline, mapOutline, settingsOutline } from 'ionicons/icons'
import ACard from '@/plugins/app/_components/a-card.vue'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import store from '@/plugins/app/_config/store'

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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      settingsOutline,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    store.dispatch('setUserLocation')
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
