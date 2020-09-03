<template>
		<b-navbar fixed-top>

				<template slot="burger">
					<p class="title is-10 pl-2 ml-4 pt-2 has-text-primary"><a @click="navigate">Posts app</a></p>
				</template>
				<template slot="end">
						<b-navbar-item tag="div">
								<div class="buttons">
										<a @click="$router.push({name: 'Auth'})" v-if="!auth.login && $route.name !== 'Auth'" class="button is-light">
												Log in
										</a>

										<a @click="$router.push({name: 'Posts'})" v-if="!auth.login && $route.name === 'Auth'" class="button is-light">
												Notes
										</a>

										<b-button v-if="auth.role === 'writer'" @click="$router.push({name: 'Manage'})" type="is-primary">Add post</b-button>

										<a @click="$store.dispatch('signOut')" v-if="auth.login" class="button is-light">
												Log out
										</a>


								</div>
						</b-navbar-item>
				</template>
		</b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: mapState({
		auth: 'auth'
	}),
	methods: {
		navigate(){
			this.$route.name !== 'Posts' && this.$router.push({name: 'Posts'})
		}
	}
}
</script>

<style lang="scss">
</style>