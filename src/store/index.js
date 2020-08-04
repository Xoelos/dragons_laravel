import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      access_token: null,
      data: null,
    },
    env: process.env.VUE_APP_ENV,
  },
  getters: {
    user(state) {
      return state.user;
    },
    env(state) {
      return state.env;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        });
      } else {
        commit('SET_USER', null);
      }
    },
    fetchToken({ commit }) {},
  },
});
