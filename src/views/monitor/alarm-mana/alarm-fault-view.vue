<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import monitorapi from '@/services/models/monitor'
export default {
  name: 'AlarmFaultView',
  data () {
    return {
      msg: '告警故障视图'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
