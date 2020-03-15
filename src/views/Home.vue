<template>
	<div class="home">
		<div v-if="user.API_USER == ''">
			<!--  -->
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';
export default {
	name: 'Home',
	data () {
		return {
			users: [],
			user: {},
		};
	},
	firestore() {
		return {
			users: db.collection('users'),
		};
	},
	computed: {
		//
	},
	watch: {
		//
	},
	methods: {
		//
	},
	mounted() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.$bind('user', db.collection('users').where('User_ID', '==', user.uid));
			}
		})
	},
}
</script>