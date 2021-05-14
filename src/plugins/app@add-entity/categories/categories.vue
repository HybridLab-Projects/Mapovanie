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
        <div v-for="group in groups" :key="group.id">
          <ion-item
            :lines="selectedCategory === group.id ? 'none' : 'inset'"
            button
            :detail-icon="selectedCategory === group.id ? chevronDown : 'chevron-forward'"
            class="ion-margin-end"
            @click="toggleSelectedCategory(group.id)"
          >
            <ion-avatar>
              <img :src="group?.image.url">
            </ion-avatar>
            <!--          <ion-icon-->
            <!--            slot="end"-->
            <!--            :icon="star"-->
            <!--            @click.stop="test()"-->
            <!--          />-->
            <ion-label class="ion-margin-start">
              <h2>{{ group.name }}</h2>
            </ion-label>
          </ion-item>
          <div v-if="selectedCategory === group.id">
            <ion-item
              v-for="category in group.categories"
              :key="category.id"
              button
              :router-link="`/tutorial/${group.id}/${category.id}`"
              class="ion-margin-start"
            >
              <ion-avatar>
                <img :src="category?.icon?.url">
              </ion-avatar>
              <ion-label class="ion-margin-start">
                {{ category?.full_name }}
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
import { mapActions } from 'vuex'

import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
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
import { Category, Group } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'Categories',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
  },
  data() {
    return {
      starOutline,
      star,
      chevronDown,
      search: '',
      selectedCategory: -1,
    }
  },
  computed: {
    groups(): Group[] {
      return this.$store.state.groups
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
</style>
