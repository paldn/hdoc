<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import trafficanalysisapi from '@/services/models/traffic-analysis'
export default {
  name: 'TrafficAnalysis',
  data () {
    return {
      msg: '流量监控'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
