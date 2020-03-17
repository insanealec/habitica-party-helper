import Vue from 'vue'
import Vuex from 'vuex'
import Habitica from '../classes/Habitica.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		habitica: null,
	},
	getters: {
		user: state => state.user,
		habitica: state => state.habitica,
	},
	mutations: {
		user(state, value) {
			state.user = value;
		},
		habitica(state) {
			state.habitica = new Habitica();
		},
	},
	actions: {
	},
	modules: {
	}
})
