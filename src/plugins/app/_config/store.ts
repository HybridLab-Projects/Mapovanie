import { createStore, createLogger } from 'vuex'
import {
  Category, Entity, State, User,
} from '@/plugins/app/_config/types'
import Axios from 'axios'

import { Plugins } from '@capacitor/core'
import Geojson from 'geojson'
// eslint-disable-next-line import/no-cycle
import router from './router'

const { Storage } = Plugins

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
    async login({ commit, dispatch }, loginData: Record<string, any>) {
      commit('userLoggedIn', loginData)
      console.log('AKAKAK')
      await Storage.set({ key: 'userToken', value: JSON.stringify(loginData.data.token) })
      await Storage.set({ key: 'userData', value: JSON.stringify(loginData.data.user) })
      await dispatch('fetchLeaderboardUsers')
      await dispatch('fetchEntities')
      await dispatch('fetchCategories')
      await router.push({ name: 'Latest' })
    },
    async logout({ commit }) {
      try {
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
    getEntityById: (state) => (id: number|string): Entity|undefined => state.entities.find(
      (entity) => +entity.id === +id,
    ),
    isUserLoggedIn: (state) => !!state.token,
    // @ts-expect-error missing type
    getEntityGeoJson: (state) => Geojson.parse(state.entities, { Point: ['lat', 'lon'] }),
    getCategoryById: (state) => (id: number|string): Category|undefined => state.categories.find(
      (category) => +category.id === +id,
    ),
  },
  plugins: [createLogger()],
})
