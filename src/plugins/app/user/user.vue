<template>
  <ion-page>
    <a-header title="Profil" back />
    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="d-flex ion-justify-content-center ion-margin-top">
        <ion-avatar>
          <img :src="user?.avatar">
        </ion-avatar>
      </div>
      <h1 class="ion-text-center">
        {{ user?.name }}
      </h1>
      <h6 class="ion-no-margin ion-text-center">
        {{ user?.points }} 🔥
      </h6>
      <h5 class="posts-title">
        Príspevky
      </h5>
      <div v-if="user?.entities?.length">
        <ion-card
          v-for="entity in user?.entities"
          :key="entity?.id"
          button
          :router-link="`/entity-detail/${entity?.id}`"
        >
          <ion-img :src="entity?.images[0]?.url" />
          <ion-card-header>
            <ion-card-subtitle class="d-flex">
              <ion-icon
                :icon="locationOutline"
                size="small"
                class="mr-1"
              />
              <span class="ion-align-self-center">{{ entity?.address?.split(',')[0] }}</span>
            </ion-card-subtitle>
            <ion-card-title
              class="d-flex ion-margin-top"
            >
              <ion-icon
                :icon="mapOutline"
                size="large"
                class="ion-margin-end"
              />
              <span class="ion-align-self-center">{{ entity?.category.full_name }}</span>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
      <div v-else>
        <ion-label color="medium">
          Užívateľ zatiaľ nemá žiadne príspevky.
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { LeaderboardUser } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'User',
  components: {
    IonPage,
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonIcon,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      id: '0',
    }
  },
  ionViewWillEnter() {
    console.log('test')
    this.id = this.$route.params.id as string
    console.log(this.id)
  },
  computed: {
    user(): LeaderboardUser|undefined {
      console.log(this.id)
      return this.$store.getters.getUserById(this.id)
    },
  },
  methods: {
    ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchUserinfo')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },

})

</script>

<style lang="scss" scoped>
ion-avatar {
  height: 10rem;
  width: 10rem;
}

.posts-title {
  margin-top: 2rem;
}
</style>
