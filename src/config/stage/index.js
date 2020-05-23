import Utils from "@/services/utils/util";

import deditor from './3d-editor'
import overview from './overview'
import allmonitor from './allmonitor'
import businessmonitor from './business-monitor'
import configmana from './config-mana'
import trafficanalysis from './traffic-analysis'
import dynamicenvironmentmonitor from './dynamic-environment-monitor'
import tdview from './3d-views'
import assetsmana from './assets-mana'
import wlanmana from './wlan-mana'
import ipaddrmana from './ipAddr-mana'
import setting from './setting'

/**
 * @param {String} type       类型 folder： 有子路由 / tab 在右侧以 tab： 形式展示 / view： 直接展示页面
 * @param {String} title      页面 title / sidebar title
 * @param {Symbol} name       路由名称
 * @param {String} route      路由路径
 * @param {String} filePath   文件路径
 * @param {String} icon       图标 iconfont 类名 / 图片路径
 * @param {String} order      路由排序
 * @param {String} inNav      是不是一个路由
 * @param {Array}  children   子菜单
 */

let homeRouter = [
    deditor,
    overview,
    allmonitor,
    businessmonitor,
    configmana,
    trafficanalysis,
    dynamicenvironmentmonitor,
    tdview,
    assetsmana,
    wlanmana,
    ipaddrmana,
    setting
]

// 处理顺序
homeRouter = Utils.sortByOrder(homeRouter)

// 递归使用 Symbol 处理 name 字段, 保证唯一性
const deepReduceName = (target) => {
  if (Array.isArray(target)) {
    target.forEach((item) => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
    return
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      target.name = target.name || Utils.getRandomStr()
      target.name = Symbol(target.name)
    }

    if (Array.isArray(target.children)) {
      target.children.forEach((item) => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

deepReduceName(homeRouter)

export default homeRouter