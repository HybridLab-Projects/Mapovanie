<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Pridať strom</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-img
				:src="image.webPath"
				class="ion-padding form-img"
				@click="retakePicture()"
			></ion-img>
			<div class="tree-container ion-margin">
				<ion-button
					class="leaf-tree"
					:class="
						treeType === 'leaf' ? 'leaf-tree-selected' : 'tree-unselected'
					"
					slot="icon-only"
					@click="treeType = 'leaf'"
				>
					<ion-icon
						src="/assets/icon/leaf-tree.svg"
						class="tree-icon"
					></ion-icon>
				</ion-button>
				<ion-button
					class="fir-tree"
					:class="treeType === 'fir' ? 'fir-tree-selected' : 'tree-unselected'"
					slot="icon-only"
					@click="treeType = 'fir'"
				>
					<ion-icon
						src="/assets/icon/fir-tree.svg"
						class="tree-icon"
					></ion-icon>
				</ion-button>
			</div>
		</ion-content>
		<ion-button
			expand="block"
			class="submit-button ion-margin"
			:disabled="!treeType"
			@click="submit()"
		>
			Odoslať
		</ion-button>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { loadingController } from '@ionic/vue';
import Axios from 'axios';

import CameraPlugin from '@/plugins/app/camera';
import DevicePlugin from '@/plugins/app/device';
import GeolocationPlugin from '@/plugins/app/geolocation';

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonImg,
	IonButton,
	IonIcon,
	IonButtons,
	IonBackButton,
} from '@ionic/vue';
import { CameraPhoto } from '@capacitor/core';
export default defineComponent({
	name: 'Form',
	data() {
		return {
			image: {} as CameraPhoto,
			treeType: '',
		};
	},
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonImg,
		IonButton,
		IonIcon,
		IonButtons,
		IonBackButton,
	},
	ionViewWillEnter() {
		this.treeType = '';
		const imageStringified = this.$route.params.image as string;
		if (imageStringified) {
			const image = JSON.parse(imageStringified);
			this.image = image;
		}
	},
	methods: {
		async retakePicture() {
			const image = await CameraPlugin.takePicture();
			this.image = image;
		},
		async submit() {
			const loading = await loadingController.create({
				message: 'Odosielam...',
			});
			try {
				await loading.present();
				const deviceInfo = await DevicePlugin.getDeviceInfo();
				const deviceLocation = await GeolocationPlugin.getCurrentPosition();
				if (
					!this.treeType ||
					!deviceLocation.coords.longitude ||
					!deviceLocation.coords.latitude ||
					!deviceInfo.uuid ||
					!this.image.dataUrl
				) {
					throw 'Error';
				}
				await Axios.post(
					'https://mapovanie.hybridlab.dev/backend/api/entities',
					{
						type: 'tree',
						// eslint-disable-next-line @typescript-eslint/camelcase
						sub_type: this.treeType,
						longitude: deviceLocation.coords.longitude,
						latitude: deviceLocation.coords.latitude,
						// eslint-disable-next-line @typescript-eslint/camelcase
						device_uuid: deviceInfo.uuid,
						image: this.image.dataUrl,
					}
				);
				await loading.dismiss();

				this.$router.push({
					name: 'Success',
				});
			} catch (err) {
				console.log(err);

				await loading.dismiss();

				this.$router.push({
					name: 'Fail',
				});
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.form-img::part(image) {
	border-radius: 15%;
}
.leaf-tree {
	height: 38vw;
	width: 38vw;
	--border-radius: 15%;
	--background: var(--ion-color-success-tint);
}

.fir-tree {
	height: 38vw;
	width: 38vw;
	--border-radius: 15%;
	--background: var(--ion-color-danger-tint);
}

.tree-container {
	display: flex;
	justify-content: space-between;
}

.leaf-tree-selected {
	--box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
	--background: var(--ion-color-success-shade);
}

.fir-tree-selected {
	--box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
	--background: var(--ion-color-danger-shade);
}

.tree-unselected {
	--box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.tree-icon {
	font-size: 96px;
	color: black;
}
</style>