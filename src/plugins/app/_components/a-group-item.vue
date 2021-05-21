<template>
  <ion-item button :router-link="`/group/${group?.id}`">
    <ion-avatar slot="start">
      <img :src="group?.image.url">
    </ion-avatar>
    <ion-label>
      <p class="group-text">
        {{ group?.name }}
      </p>
      <p class="member-text">
        {{ group.members_count }} členov
      </p>
      <ion-badge
        v-for="(tag, i) in group?.tags_string.split(' ').slice(0,2)"
        :key="i"
        class="mr-1"
      >
        {{ tag }}
      </ion-badge>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/vue'
import { Group } from '@/plugins/app/_config/types'

export default defineComponent({
  name: 'AGroupItem',
  components: {
    IonAvatar,
    IonItem,
    IonLabel,
    IonBadge,
  },
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true,
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

ion-item::part(detail-icon) {
  color: var(--ion-text-color);
  opacity: 1;
  border: 1px #dddde2 solid;
  border-radius: 100%;
  padding: 0.5625rem;
  font-size: 0.625rem;
  margin-right: 0.5rem;
}

ion-item {
  --inner-padding-top: 0.2rem;
  --inner-padding-bottom: 0.2rem;
}
</style>
