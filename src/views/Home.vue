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
		userID() {
			return this.userData.API_USER;
		},
		user() {
			return this.$store.getters.user;
		},
		habitica() {
			return this.$store.getters.habitica;
		},
	},
	watch: {
		//
	},
	methods: {
		async save() {
			db.collection('users')
				.doc(this.user.uid)
				.set({
					API_USER: this.API_USER,
				})
				.then(async () => {
					console.log('success');
					//Set the user header to this user.
					if (!this.hasUserData) {
						alert('No user set, cannot contact Habitica.');
						return;
					}
					this.loadMember();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadMember() {
			try {
				let thing = await this.habitica.request('member', {
					API_USER: this.userData.API_USER,
				});
				console.log(thing)
			} catch (e) {
				console.log(e.response);
			}
		},
	},
	async mounted() {
		if (this.user != null) {
			await this.$bind('userData', db.collection('users').doc(this.user.uid));
			if (!this.hasUserData) {
				//No user data has been saved yet
				this.userData = {
					API_USER: "",
					API_KEY: "",
				};
			} else if (this.hasUserData) {
				this.loadMember();
			}
		}
	},
}
</script>