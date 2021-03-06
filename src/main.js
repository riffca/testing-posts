import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css';
Vue.config.productionTip = false
Vue.use(Buefy)

store.dispatch('setAuth').then(()=>{

	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
	
})

