import { createStore, createLogger } from 'vuex';
import { Entity, State, User } from '@/plugins/app/_config/types';
import Axios from 'axios';

import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
import router from './router';

const { FacebookLogin } = Plugins;

export default createStore<State>({
  state: {
    entities: [],
    token: '',
    user: {} as User,
  },
  mutations: {
    entitiesFetched(state, entities) {
      state.entities = entities;
    },
    userLoggedIn(state, userData) {
      state.token = userData.data.token;
      state.user = userData.data.user;
      router.push({ name: 'Home' });
    },
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
          commit('userLoggedIn', data);
          await router.push({ name: 'Home' });
        } else {
          console.error('FB: Failed getting token');
        }
      } catch (err) {
        console.error('Login: ', err);
      }
    },
    async checkLogin({ commit }) {
      try {
        const result = await FacebookLogin.getCurrentAccessToken() as FacebookLoginResponse;
        if (result.accessToken) {
          console.log('test FB data: ', result.accessToken);
          // eslint-disable-next-line @typescript-eslint/camelcase
          const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/login', { oauth_token: result.accessToken.token });
          console.log('FB: ', data);
          commit('userLoggedIn', data);
        } else {
          console.error('FB: Failed getting token');
        }
      } catch (err) {
        console.error('Login: ', err);
      }
    },
    async logout({ commit }) {
      try {
        await FacebookLogin.logout();
        await router.push({ name: 'Login' });
      } catch (err) {
        console.error('logout: ', err);
      }
    },
  },
  getters: {
    getEntity: (state) => (id: number|string): Entity|undefined => state.entities.find(
      (entity) => entity.id === +id,
    ),
    isUserLoggedIn: (state) => !!state.token,
  },
  plugins: [createLogger()],
});
