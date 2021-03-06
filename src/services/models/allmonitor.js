import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class AllMonitorApi
  {
    async getManageTree()//获取设备管理树
    {
      const result = await post(`/GetManageTreeInfo.BSI?isGetMonitorFrequency=1&isGetLastTime=0&id=&_=${(new Date()).getTime()}`)
      return result
    }
    async getManageSubTree(pid)//获取设备管理子树
    {
      const result = await post(`/gettreebsbyid.BSI?isGetSelfMenu=1&isGetMonitorFrequency=1&isGetAlertAndEventCount=1&id=${pid}&_=${(new Date()).getTime()}`)
      return result
    }

    async getDeviceTypes()//获取设备类型列表
    {
      const result = await post(`/bsAlertDevicetype.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getTestDeviceTree(params)//获取测试设备子树
    {
      const result = await post(`/gettreebsbyid.BSI?isClearEmptyGroup=1&isClearEmptyDev=1&id=${params.id}&${params.extra}&_=${(new Date()).getTime()}`)
      return result
    }
    async getDeviceChildTree(id)//获取设备子树
    {
      const result = await post(`/gettreebsbyid.BSI?id=${id}&_=${(new Date()).getTime()}`)
      return result
    }
    async getDeviceTree()//获取设备树
    {
      const result = await post(`/gettree.BSI?_=${(new Date()).getTime()}`)
      return result
    }
    async getScriptTemplate(opType)//获取脚本模板
    {
      const result = await post(`/TemplateOp.bsi?opType=${opType}&_=${(new Date()).getTime()}`)
      return result
    }
    async getEmailSenderAndReceiver()//获取邮件收发人
    {
      const result = await post(`/bsAlertShowEmailSendReceiveInfo.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getEmailAlarmTemplate()//获取邮件报警模板
    {
      const result = await post(`/bsAlertShowEmailTpl.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getEmailOpTemplate(params)//获取邮件告警模板
    {
      const result = await post(`/EmailOp.bsi?emailType=${params.emailType}&opType=${params.opType}&_=${(new Date()).getTime()}`)
      return result
    }
    async getWeChatAlarmReceiver()//获取微信接收人
    {
      const result = await post(`/bsAlertShowWeixinReceiveInfo.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getMsgAlarmTemplate()//获取短信告警模板
    {
      const result = await post(`/bsAlertShowMsgTrapTpl.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getMsgAlarmModeAndReceiver()//获取短信告警方式和接收人
    {
      const result = await post(`/bsAlertShowMessageInfo.bsi?_=${(new Date()).getTime()}`)
      return result
    }
    async getAppAlarmReceiver()//获取App告警接收人
    {
      const result = await post(`/bsGetCurrentUsers.bsi?_=${(new Date()).getTime()}`)
      return result
    }

    async submitNewAlarm(params)//提交新的告警
    {
      const result = await post(`/bsAlertSaveAlertData.bsi?${params}_=${(new Date()).getTime()}`)
      return result
    }
    async modifyOldAlarm(params)//修改告警
    {
      const result = await post(`/bsAlertEditAlertData.bsi?${params}_=${(new Date()).getTime()}`)
      return result
    }
    async getAlarmDetail(params)//获取告警的详细信息
    {
      const result = await post(`/bsAlertShowInfo.bsi?GroupId=${params.GroupId}&AlertId=${params.AlarmId}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
    async activeOrDisableAlarm(params)//启用或禁止某告警
    {
      const result = await post(`/ForbidAlert.bsi?AlertGroupId=${params.GroupId}&AlertId=${params.alarmId}&ccu=${params.ccu}&Disabled=${params.Disabled}&_=${(new Date()).getTime()}`)
      return result
    }
    async removeAlarm(params)//删除某告警
    {
      const result = await post(`/bsAlertDeleteAlertData.bsi?GroupId=${params.GroupId}&AlertId=${params.alarmId}&ccu=${params.ccu}&_=${(new Date()).getTime()}`)
      return result
    }
    async getMonitorByDevice(params)
    {
      const result = await post(`/getmonitorlist.BSI?haspluginname=1&id=${params.id}&_=${(new Date()).getTime()}`)
      return result
    }
    async testAlarmMonitor(params)
    {
      const result = await post(`/TestAlert.bsi?AlertGroupId=${params.GroupId}&AlertId=${params.alarmId}&DevId=${params.DevId}&Pluginname=${params.Pluginname}&CCUId=${params.ccu}&_=${(new Date()).getTime()}`)
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
      const result = await post(`/bsAlertShowOneGroup.bsi?ccu=${params.ccu}&GroupId=${params.GroupId}&_t=${(new Date()).getTime()}`)
      return result
    }
    async getAlarmCount()//获取告警数量
    {
      const result = await post(`/getallDevsMstatus.bsi?_t=${(new Date()).getTime()}`)
      return result
    }
    async getAllMonitors(params)//获取所有监控项
    {
      const result = await post(`/bsGetallmonitorinfo.bsi?dotype=${params.dotype}&toford=${params.toford}&page=${params.page}&mon_status=${params.mon_status}&_=${(new Date()).getTime()}`)
      return result
    }
    async getSearchDevice(params)//设备检索
    {
      const result = await post(`/SearchDevListByNameOrIp.BSI?opType=${params.opType}&bGetPath=${params.bGetPath}&nodetype=${params.nodetype}&stringtype=${params.stringtype}&isall=${params.isall}&onlysub=${params.onlysub}&nameorip=${params.nameorip}&_=${(new Date()).getTime()}`)
      return result
    }
    async getEntityTemplates(params)//获取设备模板
    {
      const result = await get(`/GetEntityTemplate.bsi?gtid=${params.gtid}&_=${(new Date()).getTime()}`)
      return result
    }
    async getUsedTemplates(params)//获取设备样例
    {
      const result = await post(`/manother.sm?bsi=index&m=teng&_t=${(new Date()).getTime()}`,'etype='+JSON.stringify(params.etype))
      return result
    }
    async getEntityInputProperty(params)
    {
      const result = await post(`/addDeviceStep1.bsi?devicetype=${params.deviceType}&parentid=${params.parentId}_t=${(new Date()).getTime()}`)
      return result
    }
    async addEntity(params)
    {
      const result = await post(`/addDeviceStep2.bsi?devicetype=${params.deviceType}&groupid=${params.parentId}&_t=${(new Date()).getTime()}`,{},params.form)
      return result
    }
    async opMonitPoint(params)
    {
      const result = await await post(`/allMonitorOpGather.bsi?_t=${(new Date()).getTime()}`,{},params)
      return result
    }
    async beginTestMonitor(params)
    {
      const result = await post(`/testbegin.bsi?id=${params.deviceId}&force=${params.force}&_t=${(new Date()).getTime()}`)
      return result
    }
    async getTestMonitorResult(params)
    {
      const result = await post(`/testget.bsi?clock=${params.clock}&_t=${(new Date()).getTime()}`)
      return result
    }
  }
  export default new AllMonitorApi()