<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import settingapi from '@/services/models/setting'
export default {
  name: 'AnotherSetting',
  data () {
    return {
      msg: '其它设置'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
