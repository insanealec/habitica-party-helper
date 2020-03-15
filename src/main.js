import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin);
const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_apiKey,
	authDomain: process.env.VUE_APP_FIREBASE_authDomain,
	databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
	projectId: process.env.VUE_APP_FIREBASE_projectId,
	storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
	messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
	appId: process.env.VUE_APP_FIREBASE_appId,
	measurementId: process.env.VUE_APP_FIREBASE_measurementId,
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()

window.axios = require('axios');
window.axios.defaults.headers.common['x-api-user'] = process.env.VUE_APP_HABITICA_API_USER;
window.axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_HABITICA_API_KEY;
window.axios.defaults.headers.common['x-client'] = process.env.VUE_APP_HABITICA_API_CLIENT;


Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
