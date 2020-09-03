<template>

	<div class="posts">
		<div class="column is-5 container box main" v-for="post in posts" :key="post.id">

			<div class="card-content px-2 mx-3" v-if="!post.edit">
				<div class="media">
					<div class="media-content">
						<p class="title is-5">{{ post.title}}</p>
					</div>
				</div>
				<div class="content">
					<p class="is-size-6">{{ post.description}}</p>
					<div><time class="is-pulled-right" datetime="2016-1-1">{{ formatDate(post.createdAt)}}</time></div>
				</div>
			</div>

			<ManagePost v-if="authUser.login && post.edit" :edit="post" :cancel="()=>{post.edit=false;$forceUpdate()}"/>

			<div class="buttons container">

				<div class="column is-offset-3">

						
						<b-button
								@click="clap(post)" 
								type="is-light"
								icon-right="clap">
								Claps {{ post.claps }}
						</b-button>   						

						<template v-if="authUser.role === 'writer'">
							
							<b-button
									v-if="!post.edit"
									@click="post.edit=true;$forceUpdate()"
									type="is-info"
									icon-right="edit">
									Edit
							</b-button>

							<b-button @click="$store.dispatch('deletePost',post)" type="is-danger"
									icon-right="delete">
									Delete
							</b-button>

						</template>     
				</div>
			</div>
		</div>

		<div class="container column is-4">
			<b-pagination
					class="ml-6"
					:total="$store.state.maxPosts"
					v-model="current"
					:simple="true"
					:rounded="false"
					:per-page="perPage"
					:icon-prev="prevIcon"
					:icon-next="nextIcon"
					aria-next-label="Next page"
					aria-previous-label="Previous page"
					aria-page-label="Page"
					aria-current-label="Current page">
			</b-pagination>
		</div>
	</div>

</template>

<script>

import ManagePost from './ManagePost'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			current: 1,
			perPage: 5,
			prevIcon: 'chevron-left',
			nextIcon: 'chevron-right'
		}
	},
	components: {ManagePost},
	computed: {
		...mapState({
			posts: 'posts',
			authUser: 'auth'
		}),
	},
	watch:{
		async current(){
			await this.$store.dispatch('setPosts', { page: this.current, limit: 5, rewrite: true })
		},
	},
	methods: {
		clap(post){
			if(this.authUser.login){
				this.$store.dispatch('incClap', post)
			}
			
		},
		formatDate(val){
			let d = new Date(val)
			return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
			d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
		},
		async paginate(){
			await this.$store.dispatch('setPosts', { page: this.current, limit: 10 })
		}
	}
}
</script>

<style lang="scss">

</style>