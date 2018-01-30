import Vue from 'vue'
import App from './App.vue'

// https://github.com/Akryum/vue-apollo#installation
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

new Vue({
  el: '#app',
  apolloProvider,
  // The `h` stands for `Hyperscript`, and is an alias to `createElement`.
  render: h => h(App)
})
