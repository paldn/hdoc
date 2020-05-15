<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import assetsmanaapi from '@/services/models/assets-mana'
export default {
  name: 'MaintenanceRecord',
  data () {
    return {
      msg: '维保记录'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
