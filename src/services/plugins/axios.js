/**
 * https://github.com/TaleLin/lin-cms-vue/blob/master/src/lin/plugins/axios.js
 */

import Vue from 'vue'
import axios from 'axios'
import Config from '@/config/index'
import { Message } from 'element-ui'


const config = {
  baseURL: Config.baseUrl,
  timeout: 30 * 60 * 1000,
  crossDomain: true,
  validateStatus(status) {
    return status >= 200 && status < 500
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(config => {
  if(window.localStorage.getItem("token"))
  {
    config.headers.Authorization = "Bearer " + window.localStorage.getItem("token")
  }
  return config
}, error => {
  Promise.reject(error)
})

_axios.interceptors.response.use(async (res) => {
  
  if(res.status == 403)
  {
    Message("你没有权限执行此操作")
    return
  }
  return res.data
}, error => {
  // eslint-disable-next-line no-console
  console.log(error)
})

Plugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

if (!Vue.axios) {
  Vue.use(Plugin)
}

// 导出常用函数

export function post(url, data = {}, params = {}) {
  return _axios({
    method: 'post',
    url,
    data,
    params
  })
}

export function get(url, params = {}) {
  return _axios({
    method: 'get',
    url,
    params
  })
}

export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data,
  })
}

export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params,
  })
}

export default _axios