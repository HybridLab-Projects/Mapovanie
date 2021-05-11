<template>
  <ion-item button :router-link="`/group/${group.id}`">
    <ion-avatar slot="start">
      <img :src="`https://avatars.dicebear.com/api/identicon/${group.id}.svg`">
    </ion-avatar>
    <ion-label>
      <h2>{{ group.name }}</h2>
      <ion-badge color="warning">
        {{ group.badge }}
      </ion-badge>
      <p>{{ group.members_count }} členov</p>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/vue'

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
      type: Object, // TODO make group type - as PropType<Group>,
      required: true,
    },
  },
})
</script>
