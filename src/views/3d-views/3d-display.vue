<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import dviewapi from '@/services/models/3d-view'
export default {
  name: 'ThreeDimensionalDisplay',
  data () {
    return {
      msg: '3D展示'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
