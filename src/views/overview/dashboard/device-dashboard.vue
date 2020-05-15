<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import overviewapi from '@/services/models/overview'
export default {
  name: 'DeviceDashboard',
  data () {
    return {
      msg: '设备仪表盘'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
