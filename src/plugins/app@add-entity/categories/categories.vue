<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kategórie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Kategórie
          </ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar v-model="search" debounce="0" />
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <div v-for="(category, i) in filteredCategories" :key="i">
          <ion-item
            :lines="selectedCategory === i ? 'none' : 'inset'"
            button
            :detail-icon="selectedCategory === i ? chevronDown : 'chevron-forward'"
            class="ion-margin-end"
            @click="toggleSelectedCategory(i)"
          >
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
          <div v-if="selectedCategory === i">
            <ion-item
              v-for="(subcategory, j) in subcategories"
              :key="j"
              button
              :router-link="`/tutorial/${category.id}`"
              class="ion-margin-start"
            >
              <ion-avatar>
                <img src="https://avatars.dicebear.com/api/identicon/:seed.svg">
              </ion-avatar>
              <ion-label class="ion-margin-start">
                {{ subcategory.name }}
              </ion-label>
            </ion-item>
          </div>
        </div>
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
  IonItem,
  IonLabel,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonAvatar,
} from '@ionic/vue'

import {
  starOutline,
  star,
  chevronDown,
} from 'ionicons/icons'
import { Category } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Categories',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonAvatar,
  },
  data() {
    return {
      starOutline,
      star,
      chevronDown,
      search: '',
      selectedCategory: -1,
      subcategories: {
        one: {
          id: 0,
          name: 'interier',
        },
        two: {
          id: 1,
          name: 'exterier',
        },
      },
    }
  },
  computed: {
    ...mapState(['categories']),
    filteredCategories(): Array<Category> {
      return this.categories.filter((category: Category) => category?.full_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    },
  },
  methods: {
    toggleSelectedCategory(categoryId: number) {
      this.selectedCategory = this.selectedCategory === categoryId ? -1 : categoryId
    },
    ...mapActions(['fetchCategories']),
  },
})
</script>

<style lang="postcss" scoped>
ion-img::part(image) {
  width: 32px;
}

@media (prefers-color-scheme: dark) {
  ion-img::part(image) {
    filter: brightness(0) invert(1);
  }
}
</style>
