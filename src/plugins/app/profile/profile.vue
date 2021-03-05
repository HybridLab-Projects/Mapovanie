<template>
  <ion-page>
    <i-header title="Profil" />
    <ion-content class="ion-padding">
      <div class="d-flex ion-justify-content-center ion-margin-top">
        <ion-avatar>
          <img src="https://avatars.dicebear.com/api/male/1.svg">
        </ion-avatar>
      </div>
      <h1 class="ion-text-center">
        {{ user.name }}
      </h1>
      <h6 class="ion-no-margin ion-text-center">
        ? 🔥
      </h6>
      <h5 class="posts-title">
        Moje príspevky
      </h5>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'Profile',
  components: {
    IonPage,
    IonContent,
    IonAvatar,
  },
  computed: {
    ...mapState(['user']),
  },
});

</script>

<style lang="scss" scoped>
ion-avatar {
  height: 10rem;
  width: 10rem;
}
.posts-title {
  margin-top: 2rem;
}
</style>
