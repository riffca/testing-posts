<template>
		<div class="container column is-5 container">
				<section class="section">
						<article class="message">
								<div class="message-header is-info">
										<p>Log in form</p>
								</div>
								<div class="message-body">
										<form ref="form" @submit.prevent="onSubmit">
												
												<b-field
																:type="formError.email ? 'is-danger': ''" 
																:message="formError.email"                    
												>
														<b-input
																type="email"
																placeholder="E-Mail"
																name="email"
																v-model="formData.email"
																@focus="clearInputs"
																required
														></b-input>
												</b-field>
												
												<b-field 
																:type="formError.password ? 'is-danger': ''"
																:message="formError.password"
												>
														<b-input
																placeholder="Password"
																name="password"
																type="password"
																v-model="formData.password"
																@focus="clearInputs"
																password-reveal
																required
														></b-input>
												</b-field>
												<button 
														class="button is-success"
														@click.prevent="onSubmit"
														:disabled="isDisabled"
												>
														Login
												</button>
												<div class="has-text-danger-dark is-size-4 mt-1">{{ loginError ? 'wrong credentials!' : '' }} </div>
										</form>
								</div>
						</article>
				</section>
		</div>
</template>

<script>
export default {
	data() {
		return {
			loginError: false,
			isDisabled: false,
			formData: {
				email: "",
				password: ""
			},
			formError: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		onSubmit() {
			if (this.isDisabled) return;
			this.isDisabled = true;
			this.formError.email = "";
			this.formError.password = "";
			this.loginUser(this.formData)
		},
		async loginUser({ email, password }) {
			let data = await this.$store.dispatch('setAuth', { login: email, password })
			if(!data.login) {
				this.loginError = true
				setTimeout(()=>{
					this.loginError = false
				},2000)
			} else {
				this.loginError = false
				this.$router.push({name: 'Posts'})
			}
			
		},
		clearInputs(e) {
			if (e.target && e.target.nodeName == "INPUT") {
				e.target.className = "input";
				this.formError[e.target.name] = "";
			}
		},
		showErrors(errors) {
			if (errors && typeof errors == "object") {
				errors.forEach(({ path, message }) => {
					this.formError[path] = message;
				});
			}
		}
	},
	created() {
		this.$watch(vm => [vm.formData.email, vm.formData.password].join(), () => {
			const valid = this.$refs.form.checkValidity();
			this.isDisabled = !valid;
		})
	}
};
</script>

