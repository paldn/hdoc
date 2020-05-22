<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'AutomaticDiscovery',
  data () {
    return {
      msg: '自动发现'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
