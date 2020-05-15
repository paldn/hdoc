<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import loginapi from '@/services/models/login'
export default {
  name: 'Login',
  data () {
    return {
      msg: '登录'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
