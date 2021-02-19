<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>
  <ion-list>
    <ion-item
      v-for="(user, i) in users"
      :key="i"
    >
      <ion-avatar slot="start">
        <img :src="user.avatar">
      </ion-avatar>
      <ion-label>
        <h3>{{ user.username }}</h3>
        <p>{{ user.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
} from '@ionic/vue';

export default defineComponent({
  name: 'Leaderboard',
  components: {
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
  },
  data() {
    return {
      users: [
        {
          avatar: 'https://avatars.dicebear.com/4.5/api/male/jakub.svg',
          id: 1,
          username: 'Jakub',
          description: 'Lorem',
        },
        {
          avatar: 'https://avatars.dicebear.com/4.5/api/male/jaro.svg',
          id: 1,
          username: 'Jaro',
          description: 'Lorem',
        },
      ],
      itemCount: 2,
    };
  },
  methods: {
    // doRefresh(e: CustomEvent) {
    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     this.itemCount += 2;
    //     // @ts-expect-error
    //     e.target.complete();
    //   }, 1000);
    // },
  },
});
</script>

<style lang="scss" scoped>

</style>
