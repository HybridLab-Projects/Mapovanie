<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kategórie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" style="--border-width: 0;">
        <ion-toolbar>
          <ion-title size="large">
            Kategórie
          </ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar v-model="search" />
        </ion-toolbar>
      </ion-header>
      <ion-list-header class="ion-margin-bottom">
        Obľúbené
      </ion-list-header>
      <ion-list
        v-for="(category, i) in categories"
        :key="i"
      >
        <ion-item button router-link="/tutorial">
          <ion-avatar slot="start">
            <img :src="`https://avatars.dicebear.com/4.5/api/male/${category.id}.svg`">
          </ion-avatar>
          <ion-icon
            slot="end"
            :icon="star"
            @click.stop="test()"
          />
          <ion-label>
            <h2>{{ category.full_name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

import {
  IonPage,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
} from '@ionic/vue'

import {
  starOutline,
  star,
} from 'ionicons/icons'

export default defineComponent({
  name: 'Categories',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
  },
  data() {
    return {
      starOutline,
      star,
      search: '',
    }
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapActions(['fetchCategories']),
    test() {
      console.log('cool')
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
