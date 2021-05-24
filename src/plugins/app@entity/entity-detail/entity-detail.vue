<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ entity?.category?.full_name }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openReportModal()">
            <ion-icon
              slot="icon-only"
              :icon="megaphoneOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card-content class="flex pb-4 pl-4 pr-0 pt-0">
        <div class="flex mt-4">
          <div>
            <ion-avatar
              class="ion-margin-end ion-align-self-center"
              @click="avatarClick()"
            >
              <img :src="entity?.category?.group?.image">
            </ion-avatar>
          </div>
          <div class="flex flex-col w-full">
            <ion-text color="dark">
              <p class="font-bold">
                {{ entity?.category?.group?.name }} &#9679; {{ entity?.category?.full_name }}
              </p>
            </ion-text>
            <ion-text color="medium">
              <p>{{ distanceFromObject }} km od teba &#9679; {{ when }}</p>
            </ion-text>
          </div>
        </div>
      </ion-card-content>
      <ion-img
        class="ion-margin-bottom"
        :src="entity?.images[0]?.url"
      />
      <div class="mx-4 ion-margin-top">
        <div>
          <p v-if="entity?.description?.length">
            {{ entity?.description }}
          </p>
          <p v-else>
            Užívateľ neposkytol žiadny popis.
          </p>
        </div>
        <div class="flex items-center mt-6 mb-3">
          <ion-avatar slot="start" class="mr-2">
            <img :src="require('./img/location.svg')">
          </ion-avatar>
          <ion-label class="font-bold">
            {{ entity?.address?.split(',')[0] }}
          </ion-label>
        </div>
        <div class="divider my-4" />
        <div
          class="flex items-center my-3"
          @click="$router.push(`/user/${entity?.user.id}`)"
        >
          <ion-avatar slot="start" class="mr-2">
            <img :src="entity?.user?.avatar">
          </ion-avatar>
          <ion-label class="font-bold">
            {{ entity?.user?.name }}
          </ion-label>
        </div>
      </div>

      <div :id="`map-container-entity-${entity?.id}`" class="map-container-report" />
      <ion-button class="ion-margin" expand="block" @click="openReportModal">
        Navrhnúť úpravu
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonImg,
  IonText,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  modalController,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonCardContent,
} from '@ionic/vue'

import { megaphoneOutline, locationOutline, mapOutline } from 'ionicons/icons'
import { Entity } from '@/plugins/app/_config/types'
import Mapbox from 'mapbox-gl'
import LocationHelper from '@/plugins/jakub@capacitor/geolocation/_helpers'
import { GeolocationPosition } from '@capacitor/core'
import Geolocation from '@/plugins/jakub@capacitor/geolocation'
import { DateTime } from 'luxon'
import EntityReportModalNav from '../entity-report/entity-report-nav.vue'

export default defineComponent({
  name: 'EntityDetail',
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonText,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonAvatar,
    IonLabel,
    IonCardContent,
  },
  data() {
    return {
      megaphoneOutline,
      locationOutline,
      mapOutline,
      id: '0',
      userLocation: {} as GeolocationPosition,
      map: {} as Mapbox.Map,
    }
  },
  computed: {
    entity(): Entity|undefined {
      return this.$store.getters.getEntityById(this.id)
    },
    distanceFromObject(): number {
      return LocationHelper.calculateDistance(this.entity, this.userLocation)
    },
    when(): string|null {
      if (!this.entity) return ''
      return DateTime.fromISO(this.entity.updated_at).toRelative({ locale: 'sk' })
    },
  },
  async ionViewWillEnter() {
    this.id = this.$route.params.id as string
    this.userLocation = await Geolocation.getDeviceLocation()
  },
  ionViewDidEnter() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    if (!this.entity) return
    if (Object.keys(this.map).length) return
    this.map = new Mapbox.Map({
      container: `map-container-entity-${this.entity.id}`,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+this.entity?.lon, +this.entity?.lat],
      zoom: 18,
    })
    new Mapbox.Marker()
      .setLngLat([+this.entity?.lon, +this.entity?.lat])
      .addTo(this.map)
  },
  methods: {
    async openReportModal() {
      const modal = await modalController.create({
        component: EntityReportModalNav,
        componentProps: {
          entity: this.entity,
        },
        swipeToClose: true,
        // eslint-disable-next-line no-undef
        presentingElement: document.querySelector('ion-router-outlet') as HTMLIonRouterOutletElement,
      })
      return modal.present()
    },
    avatarClick() {
      this.$router.push(`/group/${this.entity?.category.group.id}`)
    },
  },

})
</script>

<style lang="postcss" scoped>

.map-container-report {
  height: 100vw;
  width: 100vw;
}
ion-avatar {
  height: 40px;
  width: 40px;
}

.divider {
  width: 100%;
  border-bottom: 0.5px #c8c7cc solid;
}

@media (prefers-color-scheme: dark) {
  .divider {
    width: 100%;
    border-bottom: 0.5px #404040 solid;
  }
}
</style>
