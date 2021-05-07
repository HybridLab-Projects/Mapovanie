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
      <ion-item v-for="category in categories" :key="category.id">
        <ion-img :src="category?.icon.url" />
        <ion-label class="ion-margin-start">
          {{ category.full_name }}
        </ion-label>
        <ion-checkbox
          slot="end"
          :model-value="isChecked(category.id)"
          @update:model-value="check(category.id)"
        />
      </ion-item>
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
  IonImg,
  IonCheckbox, modalController,
} from '@ionic/vue'
import { Category } from '@/plugins/app/_config/types'

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
    IonImg,
    IonCheckbox,
  },
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
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
