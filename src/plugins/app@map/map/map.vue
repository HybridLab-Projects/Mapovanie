<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Mapa
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openFilterModal()">
            <ion-icon slot="icon-only" :icon="funnelOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      id="map-container"
      class="map-container"
    />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon, modalController,
} from '@ionic/vue'

import { funnelOutline } from 'ionicons/icons'

import Mapbox, { GeoJSONSource, NavigationControl } from 'mapbox-gl'
import { mapGetters, mapState } from 'vuex'

import MapFilterModal from '@/plugins/app@map/map-filter/map-filter.vue'
import { FeatureCollection, GeoJSON, Point } from 'geojson'
import { Entity } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Map',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      funnelOutline,
      map: {} as Mapbox.Map,
    }
  },
  computed: {
    ...mapState(['categories', 'myMapUnChecked']),
  },
  async ionViewDidEnter() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    if (Object.keys(this.map).length) return
    this.map = new Mapbox.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.107748, 48.148598],
      zoom: 9,
    })

    const navigation = new NavigationControl()
    this.map.addControl(navigation, 'top-right')

    this.map.on('load', () => {
      this.map.addSource('entities', {
        type: 'geojson',
        data: this.getEntityGeoJson(),
        cluster: true,
        clusterMaxZoom: 100, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      })
      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'entities',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#CCCCCC',
          'circle-radius': 25,
        },
      })
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'entities',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      })
      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'entities',
        filter: ['!=', 'cluster', true],
        paint: {
          'circle-color': [
            'case',
            // 1
            ['==', ['get', 'key', ['get', 'category']], 'bin'],
            '#66E480',
            // 2
            ['==', ['get', 'key', ['get', 'category']], 'bench'],
            '#4CB962',
            // default
            '#66E480',
          ],
          'circle-radius': 15,
          'circle-stroke-width': 7.5,
          'circle-stroke-color': [
            'case',
            // 1
            ['==', ['get', 'key', ['get', 'category']], 'bin'],
            'rgba(102, 228, 128, 0.5)',
            // 2
            ['==', ['get', 'key', ['get', 'category']], 'bench'],
            'rgba(76, 185, 98, 0.5)',
            // default
            'rgba(102, 228, 128, 0.5)',
          ],
        },
      })
      this.map.loadImage('/assets/map/icons/bin.png', (err, image) => {
        if (err || !image) throw err
        this.map.addImage('bin', image)
      })
      this.map.loadImage('/assets/map/icons/bench.png', (err, image) => {
        if (err || !image) throw err
        this.map.addImage('bench', image)
      })
      this.map.addLayer({
        id: 'point-icon',
        type: 'symbol',
        source: 'entities',
        filter: ['!=', 'cluster', true],
        layout: {
          'icon-image': [
            'case',
            // 1
            ['==', ['get', 'key', ['get', 'category']], 'bin'],
            'bin',
            // 2
            ['==', ['get', 'key', ['get', 'category']], 'bench'],
            'bench',
            // default
            'leaf',
          ],
          'icon-size': 0.35,
        },
      })
      this.map.on('click', 'clusters', (e) => {
        console.log('clustered')
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        })
        if (features[0].properties) {
          const clusterId = features[0].properties.cluster_id
          const test = this.map.getSource('entities') as GeoJSONSource
          test.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return
            this.map.easeTo({
              // @ts-expect-error wrong types
              center: features[0].geometry.coordinates,
              zoom,
            })
          })
        }
      })
      this.map.on('click', 'unclustered-point', (e) => {
        console.log('unclustered', e)
        if (e.features) {
          const entityData = e.features[0].properties
          if (entityData) this.$router.push({ name: 'EntityDetail', params: { id: entityData.id } })
        }
      })
      this.map.on('click', (e) => {
        if (
          this.map
            .queryRenderedFeatures(e.point)
            .filter((feature) => feature.source === 'entities').length === 0
        ) {
          console.log('Basemap click')
        }
      })
      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = ''
      })
      this.map.on('mouseenter', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = ''
      })
    })
  },
  methods: {
    getEntityGeoJson() {
      console.log(this.$store.getters.test)
      const geoJson = this.$store.getters.getEntityGeoJson as FeatureCollection<Point, Entity>
      geoJson.features = geoJson.features.filter((feature) => !this.myMapUnChecked.some(
        (id: number) => id === feature?.properties?.category?.id,
      ))

      return geoJson
    },
    async openFilterModal() {
      const modal = await modalController.create({
        component: MapFilterModal,
        componentProps: {
          groups: this.$store.state.groups,
        },
        swipeToClose: true,
        // eslint-disable-next-line no-undef
        presentingElement: document.querySelector('ion-router-outlet') as HTMLIonRouterOutletElement,
      })
      modal.onWillDismiss().then(() => {
        // @ts-expect-error test
        this.map.getSource('entities').setData(this.getEntityGeoJson())
      })

      return modal.present()
    },
  },
})
</script>

<style lang="postcss" scoped>
.map-container {
  height: calc(100% - (var(--header-height) + var(--footer-height)));
  width: 100%;

  &:focus {
    outline: none;
  }
}

</style>
