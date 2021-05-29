<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Filter
      </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal()">
          Hotovo
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <a-map-filter-item
        v-for="group in groups"
        :key="group"
        :group="group"
        :selected-id="selectedCategory"
        @itemClick="toggleSelectedCategory(group.id)"
      />
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
  IonCheckbox,
  modalController,
  IonAvatar,
} from '@ionic/vue'

import { chevronDown } from 'ionicons/icons'
import { Category, Group } from '@/plugins/app/_config/types'
import ACategoryItem from '@/plugins/app/_components/a-category-item.vue'
import AMapFilterItem from '@/plugins/app/_components/a-map-filter-item.vue'

export default defineComponent({
  name: 'MapFilter',
  components: {
    AMapFilterItem,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonList,
  },
  props: {
    groups: {
      type: Array as PropType<Group[]>,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: -1,
      chevronDown,
    }
  },
  methods: {
    async closeModal() {
      await modalController.dismiss()
    },
    toggleSelectedCategory(categoryId: number) {
      this.selectedCategory = this.selectedCategory === categoryId ? -1 : categoryId
    },
  },
})
</script>
