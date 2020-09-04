import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)



axios.interceptors.request.use(function (config) {
		return config;
	}, function (error) {
		return Promise.reject(error);
	});

axios.interceptors.response.use(function (response) {
	console.log('<------', response)
	return response;
}, function (error) {
	return Promise.reject(error);
});


let authStorageName = 'auth'
let jsonUrl = 'http://localhost:3004'
let authSchema = {
	login: '',
	password: ''
}


export default new Vuex.Store({
	state: {
		auth: authSchema,
		posts: [

		],
		maxPosts: 0,
		curentPage: 1
	},
	mutations: {
		'set-auth'(state,val){
			state.auth = { ...state.auth, ...val }
			localStorage.setItem(authStorageName, JSON.stringify(state.auth))
		},
		'set-posts'(state,val){
			state.posts = [...state.posts, ...val ]
		},
		'add-post'(state,val){
			state.posts.unshift(val)
			state.maxPosts++
		},				
		'rewrite-posts'(state,val){
			state.posts = val 
		},				
		'set-max-posts'(state,val){
			state.maxPosts = val
		},		
		'edit-post'(state,val){
			let postIndex = state.posts.findIndex(item=>item.id===val.id)
			state.posts.splice(postIndex,1,val)
		},	
		'delete-post'(state,postId){
			let postIndex = state.posts.findIndex(item=>item.id===postId)
			state.posts.splice(postIndex,1)
		}
	},
	actions: {
		async setAuth({commit},auth){

			let user

			if(!auth) {
				let authStore = localStorage.getItem(authStorageName)
				if(authStore) {
					user = JSON.parse(authStore)
				}
			} else {
				let res  = await axios.get(`${jsonUrl}/users?login=${auth.login}`)
				let users = res.data
				if(users.length) {
					user = users[0]
					if(user && user.password + '' !== auth.password) {
						user = ''		
					} 
				}
			}
				
			if(user) {
				commit('set-auth',user)		
				return user	
			} else {
				commit('set-auth', authSchema)
				return authSchema
			}


		},

		signOut(){
			localStorage.removeItem(authStorageName)
			window.location = ''
		},

		async setPosts({commit}, {page=1,limit=5,rewrite=false}){
			try {
				let { data: posts, headers }  = await axios.get(`${jsonUrl}/posts?_page=${page}&_limit=${limit}&_sort=updatedAt&_order=desc`)
				commit('set-max-posts', headers['x-total-count'])
				commit(!rewrite ? 'set-posts' : 'rewrite-posts',posts)
			} catch (e){
				console.warn(e)
			}
		},


		async addPost({commit}, postData){
			try {
				await axios.post(`${jsonUrl}/posts`,postData)
				commit('add-post', postData)
			} catch (e) {	
				console.warn(e)
			}
		},

		async editPost({commit}, postData){
			try {
				let { data: post } = await axios.patch(`${jsonUrl}/posts/${postData.id}`,postData)
				commit('edit-post', post)
			} catch(e) {
				console.warn(e)
			}
		},		

		async deletePost({commit}, postData){
			try {
				await axios.delete(`${jsonUrl}/posts/${postData.id}`)
				commit('delete-post', postData.id)
			} catch (e) {
				console.warn(e)
			}
		},		

		async incClap({commit}, postData){

			postData.claps++
			try {
				await axios.patch(`${jsonUrl}/posts/${postData.id}`,{claps: postData.claps})
				commit('edit-post', postData)
			} catch (e) {
				console.warn(e)
			}
		},

	},

	modules: {

	}


})
 