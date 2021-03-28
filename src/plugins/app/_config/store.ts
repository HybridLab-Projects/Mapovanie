import { createStore, createLogger } from 'vuex'
import { Entity, State, User } from '@/plugins/app/_config/types'
import Axios from 'axios'

import { Plugins } from '@capacitor/core'
import Geojson from 'geojson'
// eslint-disable-next-line import/no-cycle
import router from './router'

const { FacebookLogin, SplashScreen, Storage } = Plugins

export default createStore<State>({
  state: {
    entities: [],
    token: '',
    user: {} as User,
    leaderboardUsers: [],
    categories: [],
  },
  mutations: {
    entitiesFetched(state, entities) {
      state.entities = entities
    },
    userLoggedIn(state, userData) {
      state.token = userData.data.token
      state.user = userData.data.user
      Axios.defaults.headers.common = { Authorization: `Bearer ${userData.data.token}` }
    },
    userLoggedOut(state) {
      state.token = ''
      state.user = {} as User
      state.entities = []
      delete Axios.defaults.headers.common.Authorization
    },
    leaderboardUsersFetched(state, usersData) {
      state.leaderboardUsers = usersData.data
    },
    userinfoFetched(state, userinfo) {
      state.user = userinfo.response.user
    },
    categoriesFetched(state, categoryData) {
      state.categories = categoryData.data
    },
  },
  actions: {
    async fetchEntities({ commit }) {
      try {
        const { data } = await Axios.get(
          'https://mapovanie.hybridlab.dev/cms/api/entities',
        )
        commit('entitiesFetched', data.data)
        await Storage.set({ key: 'entities', value: JSON.stringify(data.data) })
      } catch (err) {
        console.log(err)
      }
    },
    async login({ commit, dispatch }, isSilent = false) {
      try {
        let result
        if (isSilent) {
          result = await FacebookLogin.getCurrentAccessToken()
        } else {
          result = await FacebookLogin.login({ permissions: ['email', 'public_profile'] })
        }

        if (result.accessToken) {
          console.log('test FB data: ', result.accessToken)
          const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/login', { oauth_token: result.accessToken.token })
          console.log('FB: ', data)
          commit('userLoggedIn', data)
          console.log('AKAKAK')
          await Storage.set({ key: 'userToken', value: JSON.stringify(data.data.token) })
          await Storage.set({ key: 'userData', value: JSON.stringify(data.data.user) })
          await dispatch('fetchLeaderboardUsers')
          await dispatch('fetchEntities')
          await dispatch('fetchCategories')
          await router.push({ name: 'Latest' })
          await SplashScreen.hide()
        } else {
          console.error('FB: Failed getting token')
          await router.push({ name: 'Login' })
          await SplashScreen.hide()
        }
      } catch (err) {
        console.error('Login: ', err)
        await router.push({ name: 'Login' })
        await SplashScreen.hide()
      }
    },
    async logout({ commit }) {
      try {
        await FacebookLogin.logout()
        commit('userLoggedOut')
        await Storage.remove({ key: 'entities' })
        await Storage.remove({ key: 'userToken' })
        await Storage.remove({ key: 'userData' })
        await router.push({ name: 'Login' })
      } catch (err) {
        console.error('logout: ', err)
      }
    },
    async fetchLeaderboardUsers({ commit }) {
      try {
        const { data } = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/users')
        commit('leaderboardUsersFetched', data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const { data } = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/categories')
        commit('categoriesFetched', data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchUserinfo({ commit }) {
      try {
        const { data } = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/auth/info')
        commit('userinfoFetched', data)
      } catch (err) {
        console.log(err)
      }
    },
    async reportEntity({ commit }, { entityId, type, content }) {
      try {
        await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/entities/${entityId}/reports`, { type, content })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
  getters: {
    getEntity: (state) => (id: number|string): Entity|undefined => state.entities.find(
      (entity) => entity.id === +id,
    ),
    isUserLoggedIn: (state) => !!state.token,
    // @ts-expect-error missing type
    getEntityGeoJson: (state) => Geojson.parse(state.entities, { Point: ['lat', 'lon'] }),
  },
  plugins: [createLogger()],
})
