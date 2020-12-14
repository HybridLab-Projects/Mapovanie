<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Mapovanie</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-fab
				vertical="bottom"
				horizontal="center"
				slot="fixed"
				class="ion-margin-bottom"
			>
				<ion-fab-button @click="takePicture()">
					<ion-icon :icon="cameraOutline"></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CameraPlugin from '@/plugins/app/camera';

import { cameraOutline } from 'ionicons/icons';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
} from '@ionic/vue';

export default defineComponent({
	name: 'Home',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonFab,
		IonFabButton,
		IonIcon,
	},
	data() {
		return {
			cameraOutline,
		};
	},
	methods: {
		async takePicture() {
			try {
				const image = await CameraPlugin.takePicture();
				console.log(image);
				this.$router.push({
					name: 'Form',
					params: { image: JSON.stringify(image) },
				});
			} catch (err) {
				console.log(err);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
</style>