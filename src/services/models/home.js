import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class HomeApi
  {
    async getGroupModul()
    {
      const result = await post(`/BSGetGroupModul.bsi?encoding=utf-8&_=${(new Date()).getTime()}`)
      return result
    }
  }
  export default new HomeApi()