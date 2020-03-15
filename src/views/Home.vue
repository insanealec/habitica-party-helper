<template>
	<div class="home">
		<div v-if="hasUserData">
			<p>Has User Data.</p>
		</div>
		<div v-else>
			<p>Does not have User Data.</p>
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
			// users: [],
			userData: {},
		};
	},
	firestore() {
		return {
			// users: db.collection('users'),
		};
	},
	computed: {
		hasUserData() {
			return this.userData != null && this.userData.API_USER != '';
		},
		user() {
			return this.$store.getters.user;
		},
	},
	watch: {
		//
	},
	methods: {
		//
	},
	mounted() {
		if (this.user != null) {
			this.$bind('userData', db.collection('users').doc(this.user.uid));
			if (this.userData == null) {
				//No user data has been saved yet
				this.userData = {
					API_USER: "",
					API_KEY: "",
				};
			}
		}
	},
}
</script>