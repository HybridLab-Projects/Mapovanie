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
      <div v-for="group in groups" :key="group.id">
        <ion-item
          :lines="selectedCategory === group.id ? 'none' : 'inset'"
          button
          :detail-icon="selectedCategory === group.id ? chevronDown : 'chevron-forward'"
          class="ion-margin-end"
          @click="toggleSelectedCategory(group.id)"
        >
          <ion-avatar>
            <img :src="group?.image">
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
            class="ion-margin-start"
          >
            <ion-avatar>
              <img :src="category?.icon">
            </ion-avatar>
            <ion-label class="ion-margin-start">
              {{ category?.full_name }}
            </ion-label>
            <ion-checkbox
              slot="end"
              :model-value="isChecked(category.id)"
              @update:model-value="check(category.id)"
            />
          </ion-item>
        </div>
      </div>
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

export default defineComponent({
  name: 'MapFilter',
  components: {
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
    IonAvatar,
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
    check(id: number) {
      console.log(typeof id)
      console.log('check')
      this.$store.commit('myMapUnCheckedChanged', id)
    },
    isChecked(id: number) {
      return !this.$store.state.myMapUnChecked.some((i) => i === id)
    },
    async closeModal() {
      await modalController.dismiss()
    },
    toggleSelectedCategory(categoryId: number) {
      this.selectedCategory = this.selectedCategory === categoryId ? -1 : categoryId
    },
  },

})
</script>
