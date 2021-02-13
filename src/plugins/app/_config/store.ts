import { createStore, createLogger } from 'vuex';
import { Entity, State } from '@/plugins/app/_config/types';
import Axios from 'axios';

import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
import router from './router';

const { FacebookLogin } = Plugins;

export default createStore<State>({
  state: {
    entities: [] as Array<Entity>,
  },
  mutations: {
    entitiesFetched(state, entities) {
      state.entities = entities;
    },
    // userLoggedIn(state, user) {
    //
    // }
  },
  actions: {
    async fetchEntities({ commit }) {
      try {
        const { data } = await Axios.get(
          'https://mapovanie.hybridlab.dev/cms/api/entities',
        );
        commit('entitiesFetched', data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit }) {
      try {
        const result = await FacebookLogin.login({ permissions: ['email'] }) as FacebookLoginResponse;
        if (result.accessToken) {
          console.log('FB data: ', result.accessToken);
          // eslint-disable-next-line @typescript-eslint/camelcase
          const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/login', { oauth_token: result.accessToken.token });
          console.log('FB: ', data);
          await router.push({ name: 'Home' });
        } else {
          console.error('FB: Failed getting token');
        }
      } catch (err) {
        console.error('Login: ', err);
      }
    },
    async checkLogin() {
      try {
        const result = await FacebookLogin.getCurrentAccessToken() as FacebookLoginResponse;
        if (result.accessToken) {
          console.log('test FB data: ', result.accessToken);
          // eslint-disable-next-line @typescript-eslint/camelcase
          const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/login', { oauth_token: result.accessToken.token });
          console.log('FB: ', data);
          await router.push({ name: 'Home' });
        } else {
          console.error('FB: Failed getting token');
        }
      } catch (err) {
        console.error('Login: ', err);
      }
    },
  },
  getters: {
    getEntity: (state) => (id: number|string): Entity|undefined => state.entities.find(
      (entity) => entity.id === +id,
    ),
  },
  plugins: [createLogger()],
});
