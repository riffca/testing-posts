<template>
	<div class="home">
		<PostList />
	</div>
</template>

<script>
import PostList from '@/components/PostList'
export default {
	components: {
		PostList
	},
	created(){
		if(!this.$store.state.posts.length) {
			this.$store.dispatch('setPosts',{})
		}
	},
}
</script>
