<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import dynamicenvironmentmonitorapi from '@/services/models/dynamic-environment-monitor'
export default {
  name: 'WaterLeakageDetection',
  data () {
    return {
      msg: '漏水检测'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
