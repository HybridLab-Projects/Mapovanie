import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';

import IHeader from '@/plugins/app/_layout/header.vue';

import App from './App.vue';
import router from './plugins/app/_config/router';
import store from './plugins/app/_config/store';

import './custom';

const app = createApp(App)
  .use(IonicVue, { mode: 'ios', swipeBackEnabled: false })
  .use(router)
  .use(store);

router.isReady().then(() => {
  app.mount('#app');
});

app.component('IHeader', IHeader);
