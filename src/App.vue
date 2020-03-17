<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			//
		};
	},
	firestore() {
		return {
			//
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
		this.$store.commit('habitica');
	},
}
</script>
