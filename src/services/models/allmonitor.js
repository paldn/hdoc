import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class AllMonitorApi
  {
    async getAlarmGroup()//获取告警分组
    {
      const result = await post(`/bsAlertShowAllGroup.bsi?_t=${(new Date()).getTime()}`)
      return result
    }
    async getAlarmByGroup(params)//通过告警分组获取告警
    {
      const result = await post(`bsAlertShowOneGroup.bsi?ccu=${params.ccu}&GroupId=${params.GroupId}&_t=${(new Date()).getTime()}`)
      return result
    }
  }
  export default new AllMonitorApi()