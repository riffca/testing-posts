import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Posts from '@/views/Posts'

Vue.use(VueRouter)

	const routes = [
	{
		path: '/',
		name: 'Posts',
		component: Posts
	},	
	{
		path: '/auth',
		name: 'Auth',
		component: () => import( '../views/Auth.vue')
	},
	{
		path: '/manage',
		name: 'Manage',
		component: () => import( '@/components/ManagePost.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next)=>{

	if(to.name === 'Auth' && store.state.auth.login) {
		next({name: 'Posts'})
		return
	}	

	if(to.name === 'Manage' && !store.state.auth.login) {
		next({name: 'Posts'})
		return
	}

	next()

})

export default router
