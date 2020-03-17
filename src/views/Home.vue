<template>
	<div class="home">
		<div v-if="hasUserData">
			<p>Has User Data.</p>
		</div>
		<div v-else>
			<div>
				<label for="API_USER">Enter your Habitica User ID</label>
				<input type="text" v-model="API_USER">
			</div>
			<div>
				<button @click="save">Save</button>
			</div>
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
			API_USER: '',
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
		save() {
			db.collection('users')
				.doc(this.user.uid)
				.set({
					API_USER: this.API_USER,
				})
				.then(() => {
					console.log('success');
					//Start loading user and party data.
				})
				.catch((error) => {
					console.log(error);
				});
		},
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