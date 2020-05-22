<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'TOPNReport',
  data () {
    return {
      msg: 'TOPN报告'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
