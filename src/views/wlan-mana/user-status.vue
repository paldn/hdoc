<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import wlanmanaapi from '@/services/models/wlan-mana'
export default {
  name: 'UserStatus',
  data () {
    return {
      msg: '用户状态'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
