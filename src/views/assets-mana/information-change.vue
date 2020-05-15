<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import assetsmanaapi from '@/services/models/assets-mana'
export default {
  name: 'InformationChange',
  data () {
    return {
      msg: '信息变更'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
