<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'ErrorFreqModify',
  data () {
    return {
      msg: '批量修改错误频率'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
