<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import configmanaapi from '@/services/models/config-mana'
export default {
  name: 'OptiontionSearch',
  data () {
    return {
      msg: '操作查询'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
