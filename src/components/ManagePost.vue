<template>

	<section :class="$route.name === 'Manage' ?  'column is-5 container' : ''">

		<b-field label="Title">
				<b-input v-model="post.title"></b-input>
		</b-field>

		<b-field label="Description">
				<b-input maxlength="200" type="textarea" v-model="post.description"></b-input>
		</b-field>

		<div class="container">
			<b-button type="is-primary mr-4" @click="managePost">Save</b-button>
			<b-button type="is-primary" @click="cancelAction">Cancel</b-button>
		</div>

	</section>
	
</template>

<script>

import { v4 as uuidv4 } from 'uuid';

export default {
	props: {
		edit: Object,
		cancel: Function
	},
	data () {
		return {
			post: { 
				title: "",
				description: "",
			}
		}
	},
	created() {
		this.post = { ...this.post, ...this.edit }
	},
	methods: {
		cancelAction(){
			if(this.cancel) {
				this.cancel()
			} else {
				this.$router.push({name: 'Posts'})
			}
		},
		managePost(){
			let post = { ...this.post }
			if(!this.edit) {
				post.id = uuidv4()
				post.createdAt = new Date()
			}
			post.claps = 0
			post.updatedAt = new Date()
			post.userId = this.$store.state.auth.id
			delete post.edit
			this.$store.dispatch(this.edit ? 'editPost' : 'addPost', post).then(()=>{
				if(!this.edit) {
					this.$router.push({ name: 'Posts' })
				}
			})
		}
	}
}
</script>

<style lang="scss">
</style>