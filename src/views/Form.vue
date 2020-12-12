<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
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

import CameraPlugin from '@/plugins/app/camera';
import DevicePlugin from '@/plugins/app/device';
import GeolocationPlugin from '@/plugins/app/geolocation';
import Moment from 'moment';

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonImg,
	IonButton,
	IonIcon,
} from '@ionic/vue';
export default defineComponent({
	name: 'Form',
	data() {
		return {
			image: {},
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
	},
	ionViewWillEnter() {
		this.treeType = '';
		const imageStringified = this.$route.params.image as string;
		if (imageStringified) this.image = JSON.parse(imageStringified);
	},
	methods: {
		async retakePicture() {
			const image = await CameraPlugin.takePicture();
			this.image = image;
		},
		async submit() {
			try {
				const time = Moment().format();
				const deviceInfo = await DevicePlugin.getDeviceInfo();
				const deviceLocation = await GeolocationPlugin.getCurrentPosition();

				const parsedLocation: any = {};

				if ('coords' in deviceLocation) {
					parsedLocation.coords = {};

					if ('latitude' in deviceLocation.coords) {
						parsedLocation.coords.latitude = deviceLocation.coords.latitude;
					}
					if ('longitude' in deviceLocation.coords) {
						parsedLocation.coords.longitude = deviceLocation.coords.longitude;
					}
					if ('accuracy' in deviceLocation.coords) {
						parsedLocation.coords.accuracy = deviceLocation.coords.accuracy;
					}
					if ('altitude' in deviceLocation.coords) {
						parsedLocation.coords.altitude = deviceLocation.coords.altitude;
					}
					if ('altitudeAccuracy' in deviceLocation.coords) {
						parsedLocation.coords.altitudeAccuracy =
							deviceLocation.coords.altitudeAccuracy;
					}
					if ('heading' in deviceLocation.coords) {
						parsedLocation.coords.heading = deviceLocation.coords.heading;
					}
					if ('speed' in deviceLocation.coords) {
						parsedLocation.coords.speed = deviceLocation.coords.speed;
					}
				}

				if ('timestamp' in deviceLocation) {
					parsedLocation.timestamp = deviceLocation.timestamp;
				}

				this.$router.push({
					name: 'Success',
					params: {
						treeType: this.treeType,
						time,
						image: JSON.stringify(this.image),
						deviceInfo: JSON.stringify(deviceInfo),
						deviceLocation: JSON.stringify(parsedLocation),
					},
				});
			} catch (err) {
				console.log(err);
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