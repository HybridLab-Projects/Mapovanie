import { createStore, createLogger } from 'vuex';
import { Entity, State } from '@/plugins/app/_config/types';
import Axios from 'axios';

export default createStore<State>({
  state: {
    entities: [] as Array<Entity>,
  },
  mutations: {
    entitiesFetched(state, entities) {
      state.entities = entities;
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
  },
  getters: {
    getEntity: (state) => (id: number|string): Entity|undefined => state.entities.find(
      (entity) => entity.id === +id,
    ),
  },
  plugins: [createLogger()],
});
