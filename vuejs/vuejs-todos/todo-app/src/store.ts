import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,

  },
  mutations: {  // Mutations only can do synchronous operations
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },

  },
  actions: {   // Actions can do async operations
    incrementAsync({commit}) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },

    incrementAsync2({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment');
          resolve();
        }, 1000);
      });
    },
  },
});
