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
      <div class="d-flex ion-justify-content-start ion-margin-top">
        <ion-avatar>
          <img :src="user.avatar">
        </ion-avatar>

        <ion-list>
          <ion-item lines="none">
            <h1 class="ion-text-center profile-name">
              {{ user.name }}
            </h1>
          </ion-item>

          <ion-item lines="none">
            <h6 class="prispevky">
              Prispevky
              <h6 class="ion-text-center count">
                0
              </h6>
            </h6>
            <h6 class="skupiny">
              Skupiny
              <h6 class="ion-text-center count">
                0
              </h6>
            </h6>
          </ion-item>
        </ion-list>
      </div>

      <h6 class="ion-no-margin ion-text-left text-bio">
        🏫 OANBA
        📍 Pozsony / Fél
        ♀  She / Her
        🎵 Tublatanka, Darina Rolinsova, Szélenä Gomész, Bódi Csabi
      </h6>

      <h5 class="posts-title">
        Moje príspevky
      </h5>
      <div v-if="user.entities?.length">
        <ion-card
          v-for="entity in user.entities"
          :key="entity.id"
          button
          :router-link="`/entity-detail/${entity.id}`"
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
              <span class="ion-align-self-center">{{ entity.category.full_name }}</span>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
      <div v-else>
        <ion-label color="medium">
          Ešte nemáte žiadne príspevky
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
  IonList,
  IonItem,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { locationOutline, mapOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'Profile',
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
    IonList,
    IonItem,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
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

})

</script>

<style lang="scss" scoped>
ion-avatar {
  height: 5rem;
  width: 5rem;
}

.profile-name {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
}

.prispevky {
  margin-right: 5px;
}

.skupiny {
  margin-left: 5px;
}

.count {
  margin-top: 5px;
}

.posts-title {
  margin-top: 2rem;
}

</style>
