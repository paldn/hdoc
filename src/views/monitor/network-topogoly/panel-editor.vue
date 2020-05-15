<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import monitorapi from '@/services/models/monitor'
export default {
  name: 'PanelEditor',
  data () {
    return {
      msg: '面板图配置'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
