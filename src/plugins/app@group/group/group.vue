<template>
  <ion-page>
    <a-header back title="Skupina" />
    <ion-content>
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <!--        <ion-avatar class="h-16 w-16">-->
      <!--          <img :src="group?.image?.url">-->
      <!--        </ion-avatar>-->
      <div class="ion-padding-horizontal">
        <ion-item lines="full">
          <ion-avatar slot="start">
            <img :src="group?.image?.url">
          </ion-avatar>
          <ion-label>
            <p class="group-text">
              {{ group?.name }}
            </p>
            <p class="member-text">
              {{ group?.members_count }} členov
            </p>
            <ion-badge
              v-for="(tag, i) in group?.tags_string?.split(' ')?.slice(0,2)"
              :key="i"
              class="mr-1"
            >
              {{ tag }}
            </ion-badge>
          </ion-label>
        </ion-item>
        <p class="ion-margin">
          {{ group?.description }}
        </p>
        <div class="flex justify-between">
          <div class="flex flex-col items-center w-1/2">
            <h1 class="text-4xl font-semibold">
              {{ group?.entities_count }}
            </h1>
            <p class="font-semibold">
              Príspevkov
            </p>
          </div>
          <div class="divider" />
          <div class="flex flex-col items-center w-1/2">
            <h1 class="text-4xl font-semibold">
              {{ group?.members_count }}
            </h1>
            <p class="font-semibold">
              Členov
            </p>
          </div>
        </div>
        <ion-button
          v-if="!group?.members?.some(u => u.user.id === user.id)"
          expand="block"
          class="ion-margin-top"
          @click="joinGroup()"
        >
          Pridať sa do skupiny
        </ion-button>
        <ion-button
          v-else
          expand="block"
          color="light"
          class="ion-margin-top"
          @click="leaveGroup()"
        >
          Opustiť skupinu
        </ion-button>
      </div>
      <hr class="ion-margin-vertical">
      <div />
      <ion-fab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        class="ion-margin-end ion-margin-bottom"
      >
        <ion-fab-button
          :router-link="`/group/${group?.id}/map`"
        >
          <ion-icon
            :src="require('@/plugins/app/_layout/img/map.svg')"
          />
        </ion-fab-button>
      </ion-fab>
      <!--      <ion-button :router-link="`/group/1/map`" color="success">-->
      <!--        Mapa-->
      <!--      </ion-button>-->
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
  IonBadge, IonLabel, IonFabButton, IonFab,
  IonIcon,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { Group, User } from '@/plugins/app/_config/types'
import Axios from 'axios'
import ACard from '@/plugins/app/_components/a-card.vue'

export default defineComponent({
  name: 'Group',
  components: {
    // ACard,
    IonPage,
    IonContent,
    IonAvatar,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonBadge,
    IonLabel,
    IonButton,
    IonFabButton,
    IonFab,
    IonIcon,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      id: '0',
      group: {} as Group,
    }
  },
  async ionViewWillEnter() {
    this.id = this.$route.params.id as string

    const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
    this.group = group.data.data
  },
  computed: {
    user(): User {
      return this.$store.state.user
    },
  },
  methods: {
    // ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
      this.group = group.data.data
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
    async joinGroup() {
      try {
        const { data } = await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/v1/group-member/groups/link-join/${this.group.invite_hash}`)
        const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
        this.group = group.data.data
        await this.$store.dispatch('fetchGroups')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async leaveGroup() {
      try {
        const { data } = await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.group.id}/leave`)
        const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
        this.group = group.data.data
        await this.$store.dispatch('fetchGroups')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
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
  border: 0.5px #c8c7cc solid;
}

@media (prefers-color-scheme: dark) {
  .divider {
    border: 0.5px #404040 solid;
  }
}
</style>
