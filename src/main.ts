import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import IHeader from '@/plugins/app/_layout/header.vue';

import './custom';

// @ts-expect-error
// eslint-disable-next-line import/extensions
import login from '@/plugins/capacitor/facebook-login/login.js';

import App from './App.vue';
import router from './plugins/app/_config/router';
import store from './plugins/app/_config/store';

const app = createApp(App)
  .use(IonicVue, { mode: 'ios' })
  .use(router)
  .use(store);

router.isReady().then(() => {
  login.initFacebookSdk().then(() => app.mount('#app'));
});

/* PWA components */
defineCustomElements(window);

/* Custom global compopnents */
app.component('IHeader', IHeader);
