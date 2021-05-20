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
              :icon="megaphoneOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div
        class="flex ion-align-items-center ion-padding"
        @click="$router.push(`/user/${entity?.user.id}`)"
      >
        <ion-avatar class="ion-margin-end avatar">
          <img :src="entity.category.group.image.url">
        </ion-avatar>
        <ion-text class="flex ion-justify-content-between flex-grow">
          <p>{{ entity.category.group?.name }}</p>
          <p>
            {{ when }}
          </p>
        </ion-text>
      </div>
      <ion-img
        class="ion-margin-bottom"
        :src="entity?.images[0]?.url"
      />
      <div class="ion-margin">
        <ion-text>
          <p v-if="entity?.description?.length">
            {{ entity?.description }}
          </p>
          <p v-else>
            Užívateľ neposkytol žiadny popis.
          </p>
        </ion-text>
        <ion-list class="ion-margin-top">
          <ion-item>
            <ion-avatar slot="start">
              <img src="../assets/location.svg">
            </ion-avatar>
            <ion-label>{{ entity?.address?.split(',')[0] }}</ion-label>
          </ion-item>
          <ion-item lines="none" @click="$router.push(`/user/${entity?.user.id}`)">
            <ion-avatar slot="start">
              <img :src="entity?.user?.avatar">
            </ion-avatar>
            <ion-label>{{ entity?.user?.name }}</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <div :id="`map-container-entity-${entity?.id}`" class="map-container-report" />
      <ion-button class="ion-margin" expand="block">Navrhnúť úpravu</ion-button>

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
  IonList,
  IonItem,
  IonLabel,
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
    IonList,
    IonItem,
    IonLabel,
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
    if (!document.querySelector(`#map-container-entity-${this.entity?.id}`)) return
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
  margin-top: 1rem !important;
  width: 100%;
}
</style>
