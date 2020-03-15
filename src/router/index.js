import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
	let currentUser = firebase.auth().currentUser
	console.log(currentUser)
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!currentUser) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.redirectIfLogged)) {
		if (currentUser) {
			next({
				path: '/'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
