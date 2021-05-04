<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title v-if="entity?.type === 'bench'">
          Lavička
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

    <ion-content>
      <ion-img
        class="image ion-margin"
        :src="entity?.images[0]?.url"
      />
      <div class="ion-padding">
        <ion-text
          color="medium"
          class="ion-text-center"
        >
          <h5 class="font-weight-bold ion-align-self-center ion-no-margin">
            {{ entity?.address?.split(',')[0] }}
          </h5>
        </ion-text>
        <ion-text class="d-flex" style="position: relative; padding-top: 15px">
          <ion-avatar class="avatar">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>
          <span class="ion-align-self-center">Boris Vicena</span>
          <span class="ion-align-self-center time-posted">2 weeks ago</span>
        </ion-text>

        <ion-text>
          <h1 class="description">
            Popis
          </h1>
        </ion-text>
        <ion-text
          color="medium"
        >
          <h5>
            Malý skatepark, často preplnený.
            Nachádza sa tu: Rail, Down Rail, Manual Box, Pyramída
            Otvorené non-stop
          </h5>
        </ion-text>

        <div id="map-container-report" class="map-container-report" />

        <ion-text class="ion-align-self-center">
          <p style="text-align: center; font-weight: bold; margin-bottom: 0">
            Niečo nie je správne ?
          </p>
          <div class="upravy-button">
            <ion-button color="tertiary ion-padding">
              Navrhnúť úpravu
            </ion-button>
          </div>
        </ion-text>

        <!-- <ion-text class="d-flex ion-margin-top">
          <h1
            class="ion-no-margin ion ion-align-self-center"
          >
            {{ entity?.category.full_name }}
          </h1>
        </ion-text> -->
      </div>
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
} from '@ionic/vue'

import { flagOutline, locationOutline, mapOutline } from 'ionicons/icons'
import { Entity } from '@/plugins/app/_config/types'
import Mapbox from 'mapbox-gl'
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
  },
  data() {
    return {
      flagOutline,
      locationOutline,
      mapOutline,
      id: '0',
    }
  },
  computed: {
    entity(): Entity|undefined {
      return this.$store.getters.getEntityById(this.id)
    },
  },
  ionViewWillEnter() {
    this.id = this.$route.params.id as string
  },
  mounted() {
    if (!document.querySelector('#map-container-report')) return
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    if (!this.entity) return
    const map = new Mapbox.Map({
      container: 'map-container-report',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+this.entity.lon, +this.entity.lat],
      zoom: 18,
    })
    new Mapbox.Marker()
      .setLngLat([+this.entity.lon, +this.entity.lat])
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

<style lang="scss">

.image {
  overflow: hidden;
  border-radius: 15px !important;
}

.avatar  {
width: 50% !important;
height : 50% !important;
max-width: 50px !important;
max-height: 50px !important;
padding-right: 10px;
}

.time-posted {
  position: absolute;
  right: 0px;
}

.description {
  margin-top: 40px;
}

.map-container-report {
  border-radius: 15px;
  height: 70vw;
  width: 75%;
  margin: auto;
  margin-top: 60px;
  padding: 10px;
}

.upravy-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
