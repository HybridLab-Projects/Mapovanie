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
          <ion-searchbar v-model="search" debounce="0" />
        </ion-toolbar>
      </ion-header>
      <ion-list-header class="ion-margin-bottom">
        Obľúbené
      </ion-list-header>
      <ion-list
        v-for="(category, i) in filteredCategories"
        :key="i"
      >
        <ion-item button :router-link="`/tutorial/${category.id}`">
          <ion-img :src="category?.icon.url" />
          <!--          <ion-icon-->
          <!--            slot="end"-->
          <!--            :icon="star"-->
          <!--            @click.stop="test()"-->
          <!--          />-->
          <ion-label class="ion-margin-start">
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
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
} from '@ionic/vue'

import {
  starOutline,
  star,
} from 'ionicons/icons'
import { Category } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Categories',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonImg,
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
    filteredCategories(): Array<Category> {
      return this.categories.filter((category: Category) => category.full_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    },
  },
  methods: {
    ...mapActions(['fetchCategories']),
  },
})
</script>

<style lang="scss" scoped>
ion-img::part(image) {
  width: 32px;
}
@media (prefers-color-scheme: dark) {
  ion-img::part(image) {
    filter: brightness(0) invert(1);
  }
}
</style>
