<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Mapovanie</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-fab vertical="bottom" horizontal="center" slot="fixed">
				<ion-fab-button @click="takePicture()">
					<ion-icon :icon="cameraOutline"></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

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
				const image = await Camera.getPhoto({
					quality: 90,
					allowEditing: true,
					resultType: CameraResultType.Uri,
				});
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