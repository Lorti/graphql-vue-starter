<template>
  <div id="app">
    <button @click="again"><img src="./assets/dice.svg"></button>
    <h1>{{ roll }}</h1>
  </div>
</template>

<script>
  // A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
  import gql from 'graphql-tag'

  export default {
    name: 'app',

    // In the apollo object, add an attribute for each property you want to feed with the result of an GraphQL query.
    apollo: {

      // This query will update the `hello` property of this component.
      roll: {

        // Use gql to write your GraphQL queries, you can pass arguments using the variables option.
        query: gql`query RollDice($dice: Int!) {
          roll: rollDice(numDice: $dice, numSides: 20)
        }`,

        // You can use a function instead, if you need reactivity.
        variables: {
          dice: 3
        },
      },
    },

    data() {
      return {
        roll: '[]',
      }
    },

    methods: {
      again() {

        // You can also use the Apollo Client directly.
        this.$apollo.query({
          query: gql`{
            roll: rollDice(numDice: 3, numSides: 20)
          }`,

          // Bypass caching and always make a request to the server.
          fetchPolicy: 'network-only'
        }).then(({ data }) => {
          this.roll = data.roll;
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  button {
    border: none;
    background: none;
  }
</style>
