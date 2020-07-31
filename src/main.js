import Vue from 'vue'
import ElementUI from 'element-ui'
import md5 from 'js-md5';
import App from './App.vue'
import router from './router'
import store from './store'
// 引入exceljs用来生成Excel
import ExcelJS from 'exceljs'
//百度地图
import BaiduMap from 'vue-baidu-map'
// 引入file-saver用来导出Excel
import { saveAs } from "file-saver";
import filters from '@/services/filter'

import '@/assets/scss/index.scss'
import '@/assets/scss/element-variable.scss'
import '@/assets/css/iconfont.css'

Vue.use(ElementUI)
Vue.use(BaiduMap,{ak:'elgUNVZqdsycEFHjqwmsKb8gYYKYgG1W'})
Vue.prototype.ExcelJS = ExcelJS
Vue.prototype.saveAs = saveAs
Vue.prototype.$md5 = md5;
// 全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
