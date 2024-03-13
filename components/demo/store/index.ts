import { createStore } from 'vuex';

export default createStore({
	state: {
		xxx: '',
	},
	getters: {
		xxx(state) {
			return state.xxx;
		},
	},
	mutations: {
		setXxx(state, target: any) {
			return state.xxx = target;
		},
	},
	actions: {
		setXxx(context, target: any) {
			context.commit('setXxx', target);
			return context.getters['xxx'];
		},
	},
	modules: {
	}
})
