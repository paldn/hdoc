<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import ipAddrmanaapi from '@/services/models/ipAddr-mana'
export default {
  name: 'IpAddrMana',
  data () {
    return {
      msg: 'IP地址管理'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
