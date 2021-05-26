<template>
  <ion-page>
    <ion-content class="ion-text-center">
      <ion-slides pager="true">
        <ion-slide>
          <div class="ion-padding">
            <ion-img
              class="mb-8"
              :src="require('./img/welcome.svg')"
            />
            <ion-text class="text-xl font-bold">
              <h1>Vitajte v Mapovaní</h1>
            </ion-text>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="ion-padding">
            <ion-img
              class="mb-8"
              :src="require('./img/question.svg')"
            />
            <div>
              <ion-text class="text-xl font-bold">
                <h1>Čo je to Mapovanie?</h1>
              </ion-text>
              <p class="mt-3">
                Pomôžte zmapovať svoje okolie a odporučiť zaujímavé miesta ostatným ľudom.
              </p>
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="ion-padding">
            <ion-img
              class="mb-8"
              :src="require('./img/group.svg')"
            />
            <div>
              <ion-text class="text-xl font-bold">
                <h1>V skupine to ide lepšie!</h1>
              </ion-text>
              <p class="mt-3">
                Pridajte sa do skupín ktoré Vás zaujímajú a spoznávajte obľúbené miesta.
              </p>
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="ion-padding">
            <ion-img
              class="mb-8"
              :src="require('./img/start.svg')"
            />
            <ion-text class="text-xl font-bold">
              <h1>Ste pripravený?</h1>
            </ion-text>
            <ion-button
              fill="clear"
              @click="finishSlides()"
            >
              Pokračovať
              <ion-icon
                slot="end"
                :icon="arrowForwardOutline"
              />
            </ion-button>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  IonPage,
  IonContent,
  IonSlides,
  IonSlide,
  IonButton,
  IonImg,
  IonIcon,
  IonText,
} from '@ionic/vue'

import { arrowForwardOutline } from 'ionicons/icons'

import { Storage } from '@capacitor/storage'

export default defineComponent({
  name: 'Slides',
  components: {
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonButton,
    IonImg,
    IonIcon,
    IonText,
  },
  data() {
    return {
      arrowForwardOutline,
    }
  },
  methods: {
    async finishSlides() {
      await Storage.set({ key: 'slidesFinished', value: 'true' })
      await this.$router.push({ name: 'Login' })
    },
  },
})
</script>

<style lang="postcss" scoped>
  ion-slides {
    height: 100%;
  }
</style>
