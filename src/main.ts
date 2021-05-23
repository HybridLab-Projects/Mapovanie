import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader'

import AHeader from '@/plugins/app/_layout/a-header.vue'

import './custom'

import App from './App.vue'
import router from './plugins/app/_config/router'
import store from './plugins/app/_config/store'

store.dispatch('appLoad').then(() => {
  const app = createApp(App)
    .use(IonicVue, {
      mode: 'ios',
      backButtonText: 'Späť',
      swipeBackEnabled: false,
    })
    .use(router)
    .use(store)

  console.log('load')
  router.isReady().then(() => {
    app.mount('#app')
  })

  /* PWA components */
  defineCustomElements(window)

  /* Custom global compopnents */
  app.component('AHeader', AHeader)
})
