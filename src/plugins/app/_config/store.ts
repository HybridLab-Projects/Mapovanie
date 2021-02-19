import { createStore, createLogger } from 'vuex';
import { Entity, State, User } from '@/plugins/app/_config/types';
import Axios from 'axios';

import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
// eslint-disable-next-line import/no-cycle
import router from './router';

const { FacebookLogin, SplashScreen, Storage } = Plugins;

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
    },
    userLoggedOut(state) {
      state.token = '';
      state.user = {} as User;
      state.entities = [];
    },
  },
  actions: {
    async fetchEntities({ commit }) {
      try {
        const { data } = await Axios.get(
          'https://mapovanie.hybridlab.dev/cms/api/entities',
        );
        commit('entitiesFetched', data.data);
        await Storage.set({ key: 'entities', value: JSON.stringify(data.data) });
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit }) {
      try {
        const result = await FacebookLogin.login({ permissions: ['email', 'public_profile'] }) as FacebookLoginResponse;
        if (result.accessToken) {
          console.log('FB data: ', result.accessToken);
          // eslint-disable-next-line @typescript-eslint/camelcase
          const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/login', { oauth_token: result.accessToken.token });
          console.log('FB: ', data);
          commit('userLoggedIn', data);
          await Storage.set({ key: 'userToken', value: JSON.stringify(data.data.token) });
          await Storage.set({ key: 'userData', value: JSON.stringify(data.data.user) });
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
          console.log('AKAKAK');
          await Storage.set({ key: 'userToken', value: JSON.stringify(data.data.token) });
          await Storage.set({ key: 'userData', value: JSON.stringify(data.data.user) });
          await router.push({ name: 'Home' });
          await SplashScreen.hide();
        } else {
          console.error('FB: Failed getting token');
          await router.push({ name: 'Login' });
          await SplashScreen.hide();
        }
      } catch (err) {
        console.error('Login: ', err);
        await router.push({ name: 'Login' });
        await SplashScreen.hide();
      }
    },
    async logout({ commit }) {
      try {
        await FacebookLogin.logout();
        commit('userLoggedOut');
        await Storage.remove({ key: 'entities' });
        await Storage.remove({ key: 'userToken' });
        await Storage.remove({ key: 'userData' });
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
