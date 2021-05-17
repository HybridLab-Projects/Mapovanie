import { createStore, createLogger } from 'vuex'
import {
  Category, Entity, Group, LeaderboardUser, State, User,
} from '@/plugins/app/_config/types'
import Axios from 'axios'

import { Plugins } from '@capacitor/core'
import Geojson, { FeatureCollection, Point } from 'geojson'
// eslint-disable-next-line import/no-cycle
import router from './router'

const { Storage, SplashScreen } = Plugins

export default createStore<State>({
  state: {
    entities: [],
    token: '',
    user: {} as User,
    leaderboardUsers: [],
    myMapUnChecked: [],
    groups: [],
  },
  mutations: {
    entitiesFetched(state, entities) {
      state.entities = entities
    },
    userLoggedIn(state, userData) {
      state.token = userData.token
      state.user = userData.user
      Axios.defaults.headers.common = { Authorization: `Bearer ${userData.token}` }
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
    myMapUnCheckedChanged(state, id) {
      if (state.myMapUnChecked.some((num) => num === id)) {
        state.myMapUnChecked.splice(state.myMapUnChecked.indexOf(id), 1)
      } else {
        state.myMapUnChecked.push(id)
      }
    },
    groupsFetched(state, groups) {
      state.groups = groups.data
    },
  },
  actions: {
    async appLoad({ commit, dispatch }) {
      try {
        const token = await Storage.get({ key: 'userToken' })
        const user = await Storage.get({ key: 'userData' })
        if (!token?.value || !user?.value) {
          throw new Error('Token or user is not in storage')
        }
        const { data } = await Axios.post('https://mapovanie.hybridlab.dev/cms/api/v1/auth/refresh', null,
          { headers: { Authorization: `Bearer ${token.value}` } })

        await commit('userLoggedIn', { user: data.response.user, token: data.response.token })
        await Storage.set({ key: 'userToken', value: data.response.token })
        await Storage.set({ key: 'userData', value: JSON.stringify(data.response.user) })
        await dispatch('fetchLeaderboardUsers')
        await dispatch('fetchEntities')
        await dispatch('fetchGroups')
        await SplashScreen.hide()
        console.log('test')
      } catch (err) {
        console.log(err)
        await dispatch('logout')
        const slides = await Storage.get({ key: 'slidesFinished' })
        if (!slides.value) {
          await router.replace({ name: 'Slides' })
        }
        await SplashScreen.hide()
      }
    },
    async fetchEntities({ commit }) {
      try {
        const { data } = await Axios.get(
          'https://mapovanie.hybridlab.dev/cms/api/v1/my-entities',
        )
        commit('entitiesFetched', data.data)
        await Storage.set({ key: 'entities', value: JSON.stringify(data.data) })
      } catch (err) {
        console.log(err)
      }
    },
    async login({ commit, dispatch }, loginData: Record<string, any>) {
      commit('userLoggedIn', loginData)
      await Storage.set({ key: 'userToken', value: loginData.token })
      await Storage.set({ key: 'userData', value: JSON.stringify(loginData.user) })
      await dispatch('fetchLeaderboardUsers')
      await dispatch('fetchEntities')
      await dispatch('fetchGroups')
      await router.push({ name: 'Latest' })
    },
    async logout({ commit }) {
      commit('userLoggedOut')
      await Storage.remove({ key: 'entities' })
      await Storage.remove({ key: 'userToken' })
      await Storage.remove({ key: 'userData' })
      await router.push({ name: 'Login' })
    },
    async fetchLeaderboardUsers({ commit }) {
      try {
        const { data } = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/users')
        commit('leaderboardUsersFetched', data)
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
        await Axios.post(`https://mapovanie.hybridlab.dev/cms/api/v1/entities/${entityId}/reports`, { type, content })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async fetchGroups({ commit }) {
      try {
        const { data } = await Axios.get('https://mapovanie.hybridlab.dev/cms/api/v1/groups')
        commit('groupsFetched', data)
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
    // @ts-expect-error missing types on Geojson.parse
    getEntityGeoJson: (state): FeatureCollection<Point, Entity> => Geojson.parse(state.entities, { Point: ['lat', 'lon'] }),
    test: (state) => state.groups,
    getUserById: (state) => (id: number|string): LeaderboardUser|undefined => state.leaderboardUsers
      .find(
        (user) => +user.id === +id,
      ),
    getGroupById: (state) => (id: number|string): Group|undefined => state.groups
      .find(
        (group) => +group.id === +id,
      ),
    getCategoryById:
        (state) => (groupId: string, categoryId: string): Category|undefined => state.groups
          .find((group) => +group.id === +groupId)?.categories
          .find((category) => +category.id === +categoryId),
  },
  plugins: [createLogger()],
})
