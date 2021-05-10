<template>
  <ion-page>
    <a-header back title="Skupiny" />
    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="flex ion-justify-content-start ion-margin-top">
        <ion-avatar class="h-16 w-16">
          <img src="https://play-lh.googleusercontent.com/EjJV6kCXgX9EIhKEtpYhQF8-BUb5En8sDKpOPiWSQJUxv9_RAfl4tMxyIMkQYgeqC6I=s360-rw">
        </ion-avatar>

        <ion-list class="ml-2">
          <ion-item lines="none">
            <p class=" text-2xl">
              Basketball BA
            </p>
            <ion-button color="success">
              Pridať sa
            </ion-button>
          </ion-item>

          <ion-item lines="none">
            <div slot="start">
              <p>Príspevky</p>
              <p class="ion-text-center">
                23
              </p>
            </div>
            <div>
              <p>Mapéri</p>
              <p class="ion-text-center">
                54
              </p>
            </div>
          </ion-item>
        </ion-list>
      </div>
      <ion-item lines="none">
        <ion-badge color="warning">
          Šport
        </ion-badge>
        <ion-badge color="warning">
          Voľný čas
        </ion-badge>
      </ion-item>

      <h6 class="ion-no-margin ion-text-left">
        🏀 Mapujeme Basketbalové koše od roku 2003.
      </h6>
      <ion-button href="/tabs/map" color="success">
        mapa
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonButton,
  IonBadge,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { locationOutline, mapOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'Group',
  components: {
    IonPage,
    IonContent,
    IonAvatar,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonButton,
    IonBadge,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
    }
  },
  // computed: {
  //   ...mapState(['user']),
  // },
  methods: {
    // ...mapActions(['fetchUserinfo']),
    // async doRefresh(e: CustomEvent) {
    //   await this.$store.dispatch('fetchUserinfo')
    //   // @ts-expect-error ionic stuff
    //   e.target.complete()
    // },
  },
})

</script>
