<template>
  <div class="hello">
    Main Page
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
  import Vuex from 'vuex'

  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment: state => state.count++,
      decrement: state => state.count--
    },
    actions: {
      increment (context) {
        context.commit('increment')
      },
      incrementAsync ({commit}) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }
  })
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {},
    computed: {
      count () {
        return store.state.count
      }
    },
    methods: {
      increment () {
        store.dispatch('incrementAsync')
      },
      decrement () {
        store.commit('decrement')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
