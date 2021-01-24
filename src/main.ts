import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins';

const app = createApp(App)
  .use(IonicVue, { mode: 'ios', swipeBackEnabled: false })
  .use(router)
  .use(store);

router.isReady().then(() => {
  app.mount('#app');
});
