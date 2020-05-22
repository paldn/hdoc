<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import businessmonitorapi from '@/services/models/business-monitor'
export default {
  name: 'BusinessBlock',
  data () {
    return {
      msg: '业务方块'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
