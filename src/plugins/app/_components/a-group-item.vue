<template>
  <ion-item button :router-link="`/group/${group?.id}`">
    <ion-avatar slot="start">
      <img :src="group?.image.url">
    </ion-avatar>
    <ion-label>
      <h2>{{ group?.name }}</h2>
      <ion-badge
        v-for="(tag, i) in group?.tags_string.split(' ')"
        :key="i"
        color="warning"
        class="mx-1"
      >
        {{ tag }}
      </ion-badge>
      <p>{{ group.members_count }} členov</p>
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
