<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import dynamicenvironmentmonitorapi from '@/services/models/dynamic-environment-monitor'
export default {
  name: 'SmokeSensationDetection',
  data () {
    return {
      msg: '烟感检测'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
