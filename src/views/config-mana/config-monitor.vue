<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import configmanaapi from '@/services/models/config-mana'
export default {
  name: 'ConfigMana',
  data () {
    return {
      msg: '配置监控'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
