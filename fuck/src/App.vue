<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  font-family: 'Open Sans Light';
  letter-spacing: .05em;
}
</style>
