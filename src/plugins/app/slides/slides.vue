<template>
  <ion-page>
    <ion-content class="ion-text-center">
      <ion-slides pager="true">
        <ion-slide>
          <div class="ion-padding">
            <ion-img :src="require('./img/welcome.svg')" />
            <div>
              <h2>Welcome</h2>
              <p>
                The ionic conference app is a practical
                preview of the ionic framework in action,
                and a demonstration of proper code use.
              </p>
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="ion-padding">
            <ion-img :src="require('./img/question.svg')" />
            <div>
              <h2>What is Ionic?</h2>
              <p>
                Ionic Framework is an open source
                SDK that enables developers to
                build high quality mobile apps with web technologies
                like HTML, CSS, and JavaScript.
              </p>
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="ion-padding">
            <ion-img :src="require('./img/start.svg')" />
            <h2>Ready to Play?</h2>
            <ion-button
              fill="clear"
              @click="finishSlides()"
            >
              Continue
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
} from '@ionic/vue'

import { arrowForwardOutline } from 'ionicons/icons'

import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

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

<style scoped>
  ion-slides {
    height: 100%;
  }
</style>
