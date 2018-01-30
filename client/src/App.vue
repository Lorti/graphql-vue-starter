<template>
  <div id="app">
    <button @click="again"><img src="./assets/dice.svg"></button>
    <h1>{{ roll }}</h1>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'app',
    apollo: {
      roll: {
        query: gql`query RollDice($dice: Int!) {
          roll: rollDice(numDice: $dice, numSides: 20)
        }`,
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
        this.$apollo.query({
          query: gql`{
            roll: rollDice(numDice: 3, numSides: 20)
          }`,
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
