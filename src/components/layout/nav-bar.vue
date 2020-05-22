<template>
  <div class="navbar-container">
    <screenfull></screenfull>
    <div class="subitem">
      <i class="iconfont icon-yonghu"></i>
      <span class="say-hi">Admin</span>
    </div>
    <div class="subitem">
      <i class="iconfont icon-home_focus"></i>
    </div>
    <div class="subitem">
      <i class="el-icon-refresh-left"></i>
    </div>
    <div class="subitem">
      <i class="iconfont icon-gaojing"></i>
    </div>
    <div class="subitem">
      <i class="iconfont icon-bangzhu"></i>
    </div>
    <div class="subitem">
      <i class="iconfont icon-yunxiazai"></i>
    </div>
    <div class="subitem">
      <i class="iconfont icon-guanyu"></i>
    </div>
    <div class="subitem">
      <i class="iconfont icon-guanji"></i>
    </div>
  </div>
</template>

<script>
import Screenfull from '@/components/base/screenfull'
import { mapGetters } from 'vuex'

export default {
  components: {
    Screenfull
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.navbar-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: $font-color-gray;
}

.subitem {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:10px;
  cursor:pointer;
  i{font-size:22px;}
  .say-hi {
    margin-right: 10px;
  }
}
</style>

