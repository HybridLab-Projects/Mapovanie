<template>
  <ion-page>
    <a-header back title="Skupina" />
    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <div class="flex ion-justify-content-start ion-margin-top">
        <ion-avatar class="h-16 w-16">
          <img :src="group.image.url">
        </ion-avatar>

        <ion-list class="ml-2">
          <ion-item lines="none">
            <p class=" text-2xl">
              {{ group?.name }}
            </p>
            <ion-button color="success" class="ion-margin-start" @click="joinGroup()">
              Pridať sa
            </ion-button>
          </ion-item>

          <ion-item lines="none">
            <div slot="start">
              <p>Príspevky</p>
              <p class="ion-text-center">
                ?
              </p>
            </div>
            <div>
              <p>Členovia</p>
              <p class="ion-text-center">
                {{ group?.members_count }}
              </p>
            </div>
          </ion-item>
        </ion-list>
      </div>
      <div class="ion-margin-vertical">
        <ion-badge
          v-for="(tag,i) in group?.tags_string.split(' ')"
          :key="i"
          color="warning"
          class="mx-1"
        >
          {{ tag }}
        </ion-badge>
      </div>

      <h6 class="ion-no-margin ion-text-left">
        {{ group?.description }}
      </h6>
      <ion-button :router-link="`/group/1/map`" color="success" disabled>
        Mapa
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
import { Group } from '@/plugins/app/_config/types'
import Axios from 'axios'

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
      id: '0',
    }
  },
  async ionViewWillEnter() {
    this.id = this.$route.params.id as string
  },
  computed: {
    group(): Group {
      return this.$store.getters.getGroupById(this.id)
    },
  },
  methods: {
    // ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchGroups')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
    async joinGroup() {
      try {
        const { data } = await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/v1/group-member/groups/link-join/${this.group.invite_hash}`)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
  },
})

</script>
