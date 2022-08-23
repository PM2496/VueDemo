<template>
  <Base2>
    <h1 data-text="400">400</h1>
    <h4 data-text="400 forbidden">400 Bad Request</h4>
    <p>Sorry, there is a syntax problem in the request or the request cannot be fulfilled</p>
  </Base2>
</template>

<script>
import Base2 from '../widget/Base2'

export default {
  name: 'E400',
  components: {Base2}
}
</script>

<style scoped>

</style>
