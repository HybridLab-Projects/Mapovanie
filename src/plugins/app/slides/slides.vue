<template>
  <ion-page>
    <ion-content class="ion-padding ion-text-center">
      <ion-slides pager="true">
        <ion-slide>
          <div class="slide">
            <ion-img :src="require('./img/welcome.svg')" />
            <h2>Welcome</h2>
            <p>
              The ionic conference app is a practical
              preview of the ionic framework in action,
              and a demonstration of proper code use.
            </p>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <ion-img :src="require('./img/question.svg')" />
            <h2>What is Ionic?</h2>
            <p>
              Ionic Framework is an open source
              SDK that enables developers to
              build high quality mobile apps with web technologies
              like HTML, CSS, and JavaScript.
            </p>
          </div>
        </ion-slide>

        <ion-slide>
          <div class="slide">
            <ion-img :src="require('./img/start.svg')" />
            <h2>Ready to Play?</h2>
            <ion-item lines="none">
              <p>Dont show again</p>
              <ion-checkbox
                slot="start"
                color="primary"
                checked
              />
            </ion-item>
            <ion-button
              fill="clear"
              router-link="/"
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
import { defineComponent } from 'vue';

import {
  IonPage,
  IonContent,
  IonSlides,
  IonSlide,
  IonButton,
  IonImg,
  IonItem,
  IonCheckbox,
} from '@ionic/vue';

import { arrowForwardOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonButton,
    IonImg,
    IonItem,
    IonCheckbox,
  },
  data() {
    return {
      arrowForwardOutline,
    };
  },
});
</script>
