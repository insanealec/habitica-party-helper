<template>
	<div class="login">
		<h3>Habitica Party Helper</h3>
		<input type="text" class="input" v-model="email" placeholder="email" required>
		<input type="password" class="input" v-model="password" placeholder="password" required>
		<button class="button" @click="login">Login</button>

		<p><router-link to="/register">New Here? Create an account.</router-link></p>
	</div>
</template>

<script>
import firebase from 'firebase';
export default {
	name: 'Login',
	data () {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		login() {
			firebase.auth()
				.signInWithEmailAndPassword(this.email, this.password)
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