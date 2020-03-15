import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			redirectIfLogged: true,
		},
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			redirectIfLogged: true,
		},
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				next({
					path: '/login',
					query: { redirect: to.fullPath }
				});
			} else {
				store.commit('user', user);
				next();
			}
		});
	} else if (to.matched.some(record => record.meta.redirectIfLogged)) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				store.commit('user', user);
				next({
					path: '/'
				});
			} else {
				next();
			}
		});
	} else {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				store.commit('user', user);
			}
			next();
		});
	}
})

export default router
