<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Pridať strom</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding"
			><ion-img :src="image.webPath"></ion-img
		></ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonImg,
} from '@ionic/vue';
export default defineComponent({
	name: 'Form',
	data() {
		return {
			image: { format: '', webPath: '' },
		};
	},

	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonImg,
	},
	ionViewWillEnter() {
		const imageStringified = this.$route.params.imageStringified as string;
		this.image = JSON.parse(imageStringified);
	},
});
</script>

<style lang="scss" scoped>
</style>