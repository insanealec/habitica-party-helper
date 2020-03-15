<template>
	<div class="register">
		<h3>Create a new account</h3>
		<input type="text" class="input" v-model="email" placeholder="email" required>
		<input type="password" class="input" v-model="password" placeholder="password" required>
		<button class="button" @click="register">Register</button>

		<button class="button">
			<router-link to="/">Back Home</router-link>
		</button>
	</div>
</template>

<script>
import firebase from 'firebase';
export default {
	name: 'Register',
	data () {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		register() {
			firebase.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then((user) => {
					this.$router.replace('/');
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
}
</script>