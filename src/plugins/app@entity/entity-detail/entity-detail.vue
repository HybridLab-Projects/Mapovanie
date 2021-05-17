<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ entity?.category.full_name }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openReportModal()">
            <ion-icon
              slot="icon-only"
              :icon="flagOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div
        class="flex ion-align-items-center ion-margin-bottom"
        @click="$router.push(`/user/${entity?.user.id}`)"
      >
        <ion-avatar class="ion-margin-end avatar">
          <img :src="entity?.user?.avatar">
        </ion-avatar>
        <ion-text class="flex ion-justify-content-between flex-grow">
          <p>{{ entity?.user?.name }}</p>
          <p>
            {{ when }}
          </p>
        </ion-text>
      </div>
      <ion-img
        class="image-border-radius ion-margin-bottom"
        :src="entity?.images[0]?.url"
      />
      <ion-text
        color="medium"
        class="ion-text-center"
      >
        <h5 class="font-bold ion-align-self-center ion-no-margin text-lg">
          {{ entity?.address?.split(',')[0] }}
        </h5>
      </ion-text>

      <ion-text>
        <h1 class="ion-margin-top text-2xl">
          Popis
        </h1>
        <p>{{ entity?.description }}</p>
      </ion-text>

      <ion-text>
        <h1 class="ion-margin-top text-2xl">
          Poloha
        </h1>
      </ion-text>

      <div id="map-container-report" class="map-container-report" />

      <!-- <ion-text class="flex ion-margin-top">
          <h1
            class="ion-no-margin ion ion-align-self-center"
          >
            {{ entity?.category.full_name }}
          </h1>
        </ion-text> -->
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
} from '@ionic/vue'

import { flagOutline, locationOutline, mapOutline } from 'ionicons/icons'
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
  },
  data() {
    return {
      flagOutline,
      locationOutline,
      mapOutline,
      id: '0',
      userLocation: {} as GeolocationPosition,
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
  mounted() {
    if (!document.querySelector('#map-container-report')) return
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    if (!this.entity) return
    const map = new Mapbox.Map({
      container: 'map-container-report',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+this.entity?.lon, +this.entity?.lat],
      zoom: 18,
    })
    new Mapbox.Marker()
      .setLngLat([+this.entity?.lon, +this.entity?.lat])
      .addTo(map)

    map.on('load', () => {
      map.resize()
    })
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
  },
})
</script>

<style lang="postcss" scoped>
.image-border-radius::part(image) {
  border-radius: 1rem;
}

.avatar {
  height: 2.5rem;
  width: 2.5rem;
}

.map-container-report {
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  margin-top: 1rem !important;
  width: 100%;
}
</style>
