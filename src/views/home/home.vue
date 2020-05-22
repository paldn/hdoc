<template>
  <div style="height: 100%;">
    <el-container class="container">
      <el-aside :width="sideBarWidth" class="aside">
        <sidebar :isCollapse="isCollapse" :groupmoduls="groupmoduls"></sidebar>
      </el-aside>
      <el-container>
        <el-header class="header" height="72px">
          <div ref="operate" class="header-content">
            <div class="left">
              <div class="sidebar-control" @click="changeSidebarState">
                <i :class="controlIcon"></i>
              </div>
              <breadcrumb></breadcrumb>
            </div>
            <div class="right">
              <nav-bar></nav-bar>
            </div>
          </div>
          <el-collapse-transition>
            <reuse-tab></reuse-tab>
          </el-collapse-transition>
        </el-header>
        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Sidebar, NavBar, AppMain, ReuseTab, Breadcrumb } from '@/components/layout'
import homeapi from '@/services/models/home'
export default {
  components: {
    Sidebar,
    NavBar,
    AppMain,
    ReuseTab,
    Breadcrumb
  },

  inject: ['eventBus'],

  data() {
    return {
      isCollapse: false,
      sideBarWidth: '200px',
      headerHeight: '70px',
      groupmoduls:[]
    }
  },

  watch: {
    isCollapse() {
      this.sideBarWidth = this.isCollapse ? '64px' : '200px'
    }
  },

  computed: {
    controlIcon() {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },

  methods: {
    async _Init()
    {
      try
      {
        const result = await homeapi.getGroupModul()
        if(result.status == "success")
        {
          this.groupmoduls = result.data
        }
        else
        {
          this.$message.error(result.errmsg)
        }
      }
      catch(e)
      {
        console.log(e)
      }
    },
    changeSidebarState() {
      this.isCollapse = !this.isCollapse
    }
  },
  created()
  {
    this._Init()
  },
  mounted() {
    this.eventBus.$on('noReuse', () => {
      this.$refs.operate.style.height = '71px'
    })
    this.eventBus.$on('hasReuse', () => {
      this.$refs.operate.style.height = '45px'
    })
  },

  beforeDestroy() {
    this.eventBus.$off('noReuse')
    this.eventBus.$off('hasReuse')
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.aside {
  overflow-x: hidden;
  background: $background-color-sidebar;
  z-index: $index-normal;

   &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.container {
  height: 100%;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-bottom: 1px solid $border-color-light;
  background-color: $background-color-header;
  box-shadow: 0 0 5px #eaecef;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    transition: height .2s linear;

    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      // font-size: $font-size-large;
    
      .sidebar-control {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-right: 20px;
        cursor: pointer;

        i {
          color: $font-color-gray;
        }
      }
    }

    .right
    {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }

}

.aside {
  transition: all .3s linear;
}
</style>

