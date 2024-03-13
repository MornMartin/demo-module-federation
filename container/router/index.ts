import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		children: [],
		component: () => import('../Home.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
export default router;
