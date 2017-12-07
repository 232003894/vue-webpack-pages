<template>
  <div id="app">
    <img src="../../assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
export default {
  name: 'app'{{#if_eq lintConfig "airbnb"}},{{/if_eq}},
  components: {
    HelloWorld{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
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
</style>
