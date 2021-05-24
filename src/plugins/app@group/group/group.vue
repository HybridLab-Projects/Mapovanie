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
      <div class="ion-padding-horizontal">
        <ion-item class="item-padding" lines="full">
          <ion-avatar slot="start">
            <img :src="group?.image">
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
      <div class="px-4 pt-6 pb-4">
        <ion-segment v-model="segmentValue" value="entities">
          <ion-segment-button value="entities">
            <ion-label>
              Objekty
            </ion-label>
          </ion-segment-button>
          <ion-segment-button value="members">
            <ion-label>
              Členovia
            </ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
      <div v-if="segmentValue === 'entities'">
        <div v-if="entities?.length">
          <a-card
            v-for="entity in entities"
            :key="entity?.id"
            :entity="entity"
          />
        </div>
        <div v-else>
          <p class="text-gray-400 text-center">
            Skupina zatiaľ nemá žiadne príspevky.
          </p>
        </div>
      </div>
      <div v-if="segmentValue === 'members'">
        <div v-if="group?.members?.length">
          <a-group-member-item
            v-for="member in group?.members"
            :key="member?.id"
            :member="member"
          />
        </div>
        <div v-else>
          <p class="text-gray-400 text-center">
            Skupina zatiaľ nemá žiadnych členov.
          </p>
        </div>
      </div>

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
  IonIcon, IonSegment, IonSegmentButton,
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { locationOutline, mapOutline } from 'ionicons/icons'
import { Entity, Group, User } from '@/plugins/app/_config/types'
import Axios from 'axios'
import ACard from '@/plugins/app/_components/a-card.vue'
import store from '@/plugins/app/_config/store'
import AGroupMemberItem from '@/plugins/app/_components/a-group-member-item.vue'

export default defineComponent({
  name: 'Group',
  components: {
    AGroupMemberItem,
    ACard,
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
    IonSegment,
    IonSegmentButton,
  },
  data() {
    return {
      locationOutline,
      mapOutline,
      id: '0',
      group: {} as Group,
      entities: [] as Entity[],
      segmentValue: 'entities',
    }
  },
  async ionViewWillEnter() {
    this.id = this.$route.params.id as string

    const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
    this.group = group.data.data
    const entities = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}/entities`)
    this.entities = entities.data.data
  },
  computed: {
    user(): User {
      return this.$store.state.user
    },
  },
  mounted() {
    store.dispatch('setUserLocation')
  },
  methods: {
    // ...mapActions(['fetchUserinfo']),
    async doRefresh(e: CustomEvent) {
      const group = await Axios.get(`https://mapovanie.hybridlab.dev/cms/api/v1/groups/${this.id}`)
      this.group = group.data.data
      await store.dispatch('setUserLocation')

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

.item-padding {
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
