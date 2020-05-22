<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'AlarmSendRecord',
  data () {
    return {
      msg: '告警发送记录'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
