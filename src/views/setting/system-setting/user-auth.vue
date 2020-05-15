<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import settingapi from '@/services/models/setting'
export default {
  name: 'UserAuth',
  data () {
    return {
      msg: '用户权限'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
