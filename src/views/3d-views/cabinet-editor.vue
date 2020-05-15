<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import dviewapi from '@/services/models/3d-view'
export default {
  name: 'CabinetEditor',
  data () {
    return {
      msg: '机柜编辑'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
