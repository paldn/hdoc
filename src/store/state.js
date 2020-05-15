import stageConfig from '@/config/stage'
import AppConfig from '@/config/index'

export default {
  login: false, // 是否登录
  author: null, // 当前用户
  defaultRoute: AppConfig.defaultRoute || '/product-information/about',
  sideBarLevel: AppConfig.sideBarLevel || 3,

  // 舞台配置
  stageConfig,
}