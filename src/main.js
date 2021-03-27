// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { createHttpLink, HttpLink} from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo);
// HTTP connection to the API
console.log(process.env);
const httpLink = new HttpLink({
		// You should use an absolute URL here
		uri: process.env.URL_BATCH,
		headers: {
				'Content-Type': 'application/graphql',
				'Access-Control-Allow-Origin': '*'
		}
});

// Cache implementation
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
		link: httpLink,
		cache,
		addTypename:false
})
const apolloProvider = new VueApollo({
		defaultClient: apolloClient,
})

// Create the apollo client

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
		el: '#app',
		apolloProvider,
		router,
		components: { App },
		template: '<App/>'
})
