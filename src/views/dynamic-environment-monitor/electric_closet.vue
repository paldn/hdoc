<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import dynamicenvironmentmonitorapi from '@/services/models/dynamic-environment-monitor'
export default {
  name: 'ElectricCloset',
  data () {
    return {
      msg: '配电柜'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
