<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import overviewapi from '@/services/models/overview'
export default {
  name: 'BigScreenView',
  data () {
    return {
      msg: '大屏展示'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
