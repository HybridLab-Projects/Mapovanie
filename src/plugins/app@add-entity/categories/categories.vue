<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kategórie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Odfotiť
          </ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar v-model="search" placeholder="Vyhľadaj" />
        </ion-toolbar>
      </ion-header>
      <ion-refresher
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content pulling-icon="lines" />
      </ion-refresher>
      <ion-list>
        <a-category-item
          v-for="group in searchedGroups"
          :key="group.id"
          :group="group"
          :selected-id="selectedId"
          @itemClick="selectGroup"
        />
        <ion-list />
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
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'

import {
  starOutline,
  star,
  chevronDown,
} from 'ionicons/icons'
import { Category, Group } from '@/plugins/app/_config/types'
import ACategoryItem from '@/plugins/app/_components/a-category-item.vue'
import groups from '@/plugins/app@group/groups/groups.vue'
import Axios from 'axios'

export default defineComponent({
  name: 'Categories',
  components: {
    ACategoryItem,
    IonContent,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      starOutline,
      star,
      chevronDown,
      search: '',
      selectedId: -1,
    }
  },
  computed: {
    groups(): Group[] {
      return this.$store.state.groups
    },
    searchedGroups(): Group[] {
      return this.groups.filter((group: Group) => group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    },
  },
  methods: {
    selectGroup(groupId: number) {
      this.selectedId = this.selectedId === groupId ? -1 : groupId
    },
    ...mapActions(['fetchCategories']),
    async doRefresh(e: CustomEvent) {
      await this.$store.dispatch('fetchGroups')
      // @ts-expect-error ionic stuff
      e.target.complete()
    },
  },
})
</script>

<style lang="postcss" scoped>
ion-img::part(image) {
  width: 32px;
}
</style>
