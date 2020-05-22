//业务监控路由
const BusinessMonitorRouter = {
    id:6000,
    route: null,
    name: null,
    title: '业务监控',
    type: 'folder',
    icon: 'iconfont icon-jiankong',
    filePath: 'views/business-monitor/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:6001,
            title: '业务管理',
            type: 'view',
            name: 'business-mana',
            route: '/business-monitor/business-mana',
            filePath: 'views/business-monitor/business-mana.vue',
            inNav: true,
            icon: ''
        },
        {
            id:6004,
            title: '业务列表',
            type: 'view',
            name: 'business-list',
            route: '/business-monitor/business-list',
            filePath: 'views/business-monitor/business-list.vue',
            inNav: true,
            icon: ''
        },
        {
            id:6002,
            title: '业务方块',
            type: 'view',
            name: 'business-block',
            route: '/business-monitor/business-block',
            filePath: 'views/business-monitor/business-block.vue',
            inNav: true,
            icon: ''
        },
        {
            id:6005,
            title: '业务分析',
            type: 'view',
            name: 'business-analysis',
            route: '/business-monitor/business-analysis',
            filePath: 'views/business-monitor/business-analysis.vue',
            inNav: true,
            icon: ''
        },
        {
            id:6006,
            title: '告警设置',
            type: 'view',
            name: 'alarm-setting',
            route: '/business-monitor/alarm-setting',
            filePath: 'views/business-monitor/alarm-setting.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default BusinessMonitorRouter
  