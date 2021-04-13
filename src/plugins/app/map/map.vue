<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Mapa
        </ion-title>
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
} from '@ionic/vue'

import Mapbox, { GeoJSONSource, NavigationControl } from 'mapbox-gl'
import { mapGetters } from 'vuex'
import { filterOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'Map',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  data() {
    return {
      filterOutline,
    }
  },
  computed: {
    ...mapGetters(['getEntityGeoJson']),
  },
  async mounted() {
    Mapbox.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    const map = new Mapbox.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.107748, 48.148598],
      zoom: 9,
    })
    const navigation = new NavigationControl()
    map.addControl(navigation, 'top-right')

    map.on('load', () => {
      map.addSource('entities', {
        type: 'geojson',
        data: this.getEntityGeoJson,
        cluster: true,
        clusterMaxZoom: 100, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      })
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'entities',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#CCCCCC',
          'circle-radius': 25,
        },
      })
      map.addLayer({
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
      map.addLayer({
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
      map.loadImage('/assets/map/icons/bin.png', (err, image) => {
        if (err || !image) throw err
        map.addImage('bin', image)
      })
      map.loadImage('/assets/map/icons/bench.png', (err, image) => {
        if (err || !image) throw err
        map.addImage('bench', image)
      })
      map.addLayer({
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
      map.on('click', 'clusters', (e) => {
        console.log('clustered')
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        })
        if (features[0].properties) {
          const clusterId = features[0].properties.cluster_id
          const test = map.getSource('entities') as GeoJSONSource
          test.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return
            map.easeTo({
              // @ts-expect-error wrong types
              center: features[0].geometry.coordinates,
              zoom,
            })
          })
        }
      })
      map.on('click', 'unclustered-point', (e) => {
        console.log('unclustered', e)
        if (e.features) {
          const entityData = e.features[0].properties
          if (entityData) this.$router.push({ name: 'EntityDetail', params: { id: entityData.id } })
        }
      })
      map.on('click', (e) => {
        if (
          map
            .queryRenderedFeatures(e.point)
            .filter((feature) => feature.source === 'entities').length === 0
        ) {
          console.log('Basemap click')
        }
      })
      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = ''
      })
    })
  },
})

</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
}
</style>
