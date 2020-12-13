<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Mapovanie</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<h1>Gratulujem</h1>
			<p>Úspešne si pridal strom do našej databázy.</p>
			<p>Údaje ktoré sme uložili sú:</p>
			<p>Typ stromu: {{ treeType }}</p>
			<p>Čas: {{ time }}</p>
			<p>Informácie o zariadení:</p>
			<ul>
				<li>UUID: {{ deviceUUID }}</li>
			</ul>
			<p>Informácie o polohe:</p>
			<ul>
				<div>
					<li v-for="(location, i) in deviceLocation" :key="i">
						{{ i }}: {{ location }}
					</li>
				</div>
			</ul>
			<br />
			<p>Fotografia:</p>
			<ion-img :src="image.webPath" class="ion-padding form-img"></ion-img>
		</ion-content>
		<ion-button class="ion-margin" router-link="/">
			Späť na domovskú obrazovku
		</ion-button>
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
	IonButton,
	IonImg,
} from '@ionic/vue';

export default defineComponent({
	name: 'Success',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonButton,
		IonImg,
	},
	data() {
		return {
			treeType: '',
			time: '',
			image: {},
			deviceUUID: '',
			deviceLocation: {},
		};
	},
	ionViewWillEnter() {
		const treeType = this.$route.params.treeType as string;
		const time = this.$route.params.time as string;
		const deviceUUID = this.$route.params.deviceUUID as string;
		const imageStringified = this.$route.params.image as string;
		const deviceLocationStringified = this.$route.params
			.deviceLocation as string;

		this.treeType = treeType;
		this.time = time;
		this.deviceUUID = deviceUUID;
		this.image = JSON.parse(imageStringified);
		this.deviceLocation = JSON.parse(deviceLocationStringified);
	},
});
</script>

<style lang="scss" scoped>
</style>