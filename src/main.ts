import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';
import router from './router';

import './plugins';

const app = createApp(App)
  .use(IonicVue, { mode: 'ios' })
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
