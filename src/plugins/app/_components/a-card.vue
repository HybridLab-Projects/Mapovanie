<template>
  <ion-card
    button
    :router-link="`/entity-detail/${entity.id}`"
    class="object-card"
  >
    <ion-card-content class="flex pb-4 pl-4 pr-0 pt-0">
      <div class="flex mt-4">
        <ion-avatar class="ion-margin-end ion-align-self-center card-avatar" @click="avatarClick">
          <img :src="entity.category.group.image.url">
        </ion-avatar>
        <div class="flex flex-col w-full">
          <ion-text color="dark">
            <p class="font-bold">
              {{ entity.category.group?.name }} &#9679; {{ entity.category.full_name }}
            </p>
          </ion-text>
          <ion-text color="medium">
            <p>{{ distanceFromObject }} km od teba &#9679; {{ when }}</p>
          </ion-text>
        </div>
      </div>
      <ion-buttons slot="end" class="items-start pt-2 pr-2 flex-grow justify-end">
        <ion-button slot="icon-only" @click="openActionSheet">
          <ion-icon :icon="ellipsisVertical" />
        </ion-button>
      </ion-buttons>
    </ion-card-content>
    <ion-img :src="entity?.images[0]?.url" />
    <ion-card-content class="p-4">
      <ion-label color="dark">
        <p>
          {{ entity?.description.slice(0, 50).trim() }}...
        </p>
      </ion-label>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
/* eslint-disable no-mixed-operators */

import { defineComponent, PropType } from 'vue'
import { Entity } from '@/plugins/app/_config/types'
import {
  IonCard, IonCardContent,
  IonImg, IonAvatar, IonText, IonLabel, IonIcon, IonButton,
  IonButtons, actionSheetController, modalController,
} from '@ionic/vue'
import { GeolocationPosition } from '@capacitor/core'
import { DateTime } from 'luxon'
import LocationHelper from '@/plugins/jakub@capacitor/geolocation/_helpers'
import { ellipsisVertical, megaphone } from 'ionicons/icons'
import EntityReportModalNav from '@/plugins/app@entity/entity-report/entity-report-nav.vue'

export default defineComponent({
  name: 'ACard',
  components: {
    IonCard,
    IonCardContent,
    IonImg,
    IonAvatar,
    IonText,
    IonLabel,
    IonButtons,
    IonButton,
    IonIcon,
  },
  props: {
    entity: {
      type: Object as PropType<Entity>,
      required: true,
    },
  },
  data() {
    return {
      ellipsisVertical,
    }
  },
  computed: {
    distanceFromObject(): number {
      return LocationHelper.calculateDistance(this.entity, this.userLocation)
    },
    when(): string|null {
      return DateTime.fromISO(this.entity.updated_at).toRelative({ locale: 'sk' })
    },
    userLocation(): GeolocationPosition {
      return this.$store.state.userLocation
    },
  },
  methods: {
    async openActionSheet(e: CustomEvent) {
      e.stopPropagation()

      const actionSheet = await actionSheetController.create({
        header: 'Možnosti',
        buttons: [
          {
            text: 'Nahlásiť',
            role: 'destructive',
            handler: async () => {
              const modal = await modalController.create({
                component: EntityReportModalNav,
                componentProps: {
                  entity: this.entity,
                },
                swipeToClose: true,
                // eslint-disable-next-line no-undef
                presentingElement: document.querySelector('ion-router-outlet') as HTMLIonRouterOutletElement,
              })
              return modal.present()
            },
          },
          {
            text: 'Zavrieť',
            role: 'cancel',
          },
        ],
      })
      await actionSheet.present()

      const { role } = await actionSheet.onDidDismiss()
      console.log('onDidDismiss resolved with role', role)
    },
    avatarClick(e: CustomEvent) {
      e.stopPropagation()
      this.$router.push(`/group/${this.entity.category.group.id}`)
    },
  },
})
</script>

<style lang="postcss" scoped>
p {
  margin: 0;
}

.object-card {
  border-radius: 0;
  margin: 0 0 1rem;
}

.card-avatar {
  height: 40px;
  width: 40px;
}

ion-icon {
  font-size: 16px;
  color: var(--ion-text-color);
}

@media (prefers-color-scheme: dark) {
  .object-card {
    box-shadow: rgb(255 255 255 / 15%) 0 4px 16px;
  }
}

</style>
