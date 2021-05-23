<template>
  <ion-item
    button
    :lines="selectedId === group.id ? 'none' : 'inset'"
    :detail-icon="selectedId === group.id ? chevronDown : 'chevron-forward'"
    class="group-item"
    @click="itemClick()"
  >
    <ion-avatar slot="start">
      <img :src="group?.image.url">
    </ion-avatar>
    <ion-label>
      <p class="group-text">
        {{ group?.name }}
      </p>
    </ion-label>
  </ion-item>
  <ion-list v-if="selectedId === group.id">
    <ion-item
      v-for="category in group.categories"
      :key="category.id"
      class="ml-4 category-item"
      button
      :router-link="`/tutorial/${group.id}/${category.id}`"
    >
      <ion-avatar slot="start">
        <img :src="category.icon.url">
      </ion-avatar>
      <ion-label>{{ category.full_name }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/vue'
import { chevronDown } from 'ionicons/icons'
import { Group } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'ACategoryItem',
  components: {
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
  },
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
  },
  emits: ['itemClick'],
  data() {
    return {
      chevronDown,
    }
  },
  methods: {
    itemClick() {
      this.$emit('itemClick', this.group.id)
    },
  },
})
</script>

<style lang="postcss" scoped>
ion-avatar {
  height: 40px;
  width: 40px;
}

.group-text {
  @apply text-base font-bold m-0;

  color: var(--ion-text-color);
}

.member-text {
  @apply font-semibold mb-1 text-sm;
}

.category-item::part(detail-icon) {
  color: var(--ion-text-color);
  opacity: 1;
  border: 1px #dddde2 solid;
  border-radius: 100%;
  padding: 0.4rem;
  font-size: 0.625rem;
  margin-right: 0.5rem;
}

.group-item::part(detail-icon) {
  color: var(--ion-text-color);
  opacity: 1;
  padding: 0.5625rem;
  font-size: 0.75rem;
  margin-right: 0.25rem;
}

ion-item {
  --inner-padding-top: 0.5rem;
  --inner-padding-bottom: 0.5rem;
}
</style>
