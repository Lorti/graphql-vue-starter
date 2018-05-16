import Vue from 'vue'
import App from './App.vue'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// An Apollo Link to allow sending a single http request per operation.
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

// Apollo Client is a fully-featured caching GraphQL client,
// which has view layer integrations for all the popular front-end frameworks.
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// This plugin integrates Apollo Client in your Vue.js components with declarative queries.
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#app',

  // Like vue-router or vuex, you need to specify the apolloProvider object on your root components.
  // A provider holds the apollo client instances that can then be used by all the child components.
  apolloProvider,

  // The `h` stands for `Hyperscript`, and is an alias to `createElement`.
  render: h => h(App)
})
