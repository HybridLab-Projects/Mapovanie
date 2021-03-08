<template>
  <ion-refresher
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content pulling-icon="lines" />
  </ion-refresher>
  <ion-list>
    <ion-item
      v-for="(user, i) in leaderboardUsers"
      :key="i"
    >
      <ion-avatar slot="start">
        <img :src="user.avatar">
      </ion-avatar>
      <ion-label>
        <h3>{{ user.name }}</h3>
        <p>{{ user.points }} 🔥 </p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

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
    };
  },
  computed: {
    ...mapState(['leaderboardUsers']),
  },
  methods: {
    ...mapActions(['fetchLeaderboardUsers']),
    async doRefresh(e: CustomEvent) {
      await this.fetchLeaderboardUsers();
      // @ts-expect-error
      e.target.complete();
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
