import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	showLightBox: false
  },
  mutations: {
	setLightBox(state, bool) {
		state.showLightBox = bool
	}
  },
  actions: {
	updateLightBox({commit}, bool) {
		commit('setLightBox', bool)
	}
  }
})
