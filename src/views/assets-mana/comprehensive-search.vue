<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import assetsmanaapi from '@/services/models/assets-mana'
export default {
  name: 'ComprehensiceSearch',
  data () {
    return {
      msg: '综合查询'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
