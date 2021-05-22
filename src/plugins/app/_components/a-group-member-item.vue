<template>
  <ion-item button :router-link="`/user/${member?.user?.id}`">
    <ion-avatar slot="start">
      <img :src="member?.user?.avatar">
    </ion-avatar>
    <ion-label>
      <p class="group-text flex">
        {{ member?.user?.name }}
        <ion-icon
          v-if="member.role === 'admin'"
          :icon="shieldCheckmarkOutline"
          class="self-center ml-1"
        />
      </p>
      <p class="member-text">
        {{ member?.role }}
      </p>
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
  IonIcon,
} from '@ionic/vue'
import { Group, GroupMember } from '@/plugins/app/_config/types'

import { shieldCheckmarkOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'AGroupMemberItem',
  components: {
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
  },
  props: {
    member: {
      type: Object as PropType<GroupMember>,
      required: true,
    },
  },
  data() {
    return {
      shieldCheckmarkOutline,
    }
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

ion-item {
  --inner-padding-top: 0.2rem;
  --inner-padding-bottom: 0.2rem;
}
</style>
