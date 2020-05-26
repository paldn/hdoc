import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class AllMonitorApi
  {
    async getDeviceTree()
    {
      const result = await post(`/gettree.BSI`)
      return result
    }
    async createAlarmGroup(params)//创建告警组
    {
      const result = await post(`/bsAlertAddGroup.bsi?label=${params.name}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
    async deleteAlarmGroup(params)//删除告警组
    {
      const result = await post(`/bsAlertDeleteGroup.bsi?GroupId=${params.GroupId}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
    async updateAlarmGroup(params)//更新告警组
    {
      const result = await post(`/bsAlertEditGroup.bsi?label=${params.name}&GroupId=${params.GroupId}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
    async changeAlarmGroupStatus(params)//启用或禁用告警组
    {
      const result = await post(`/ForbidAlertGroup.bsi?Disabled=${params.Disabled}&AlertGroupId=${params.GroupId}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
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