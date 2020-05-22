//配置管理路由
const ConfigManaRouter = {
    id:7000,
    route: null,
    name: null,
    title: '配置管理',
    type: 'folder',
    icon: 'iconfont icon-peizhi',
    filePath: 'views/config-mana/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:7001,
            title: '配置监控',
            type: 'view',
            name: 'config-monitor',
            route: '/config-mana/config-monitor',
            filePath: 'views/config-mana/config-monitor.vue',
            inNav: true,
            icon: ''
        },
        {
            id:7004,
            title: '统计报表',
            type: 'view',
            name: 'statistical-report',
            route: '/config-mana/statistical-report',
            filePath: 'views/config-mana/statistical-report.vue',
            inNav: true,
            icon: ''
        },
        {
            id:7003,
            title: '操作查询',
            type: 'view',
            name: 'optiontion-search',
            route: '/config-mana/optiontion-search',
            filePath: 'views/config-mana/optiontion-search.vue',
            inNav: true,
            icon: ''
        },
        {
            id:7005,
            title: '设置',
            type: 'view',
            name: 'setting',
            route: '/config-mana/setting',
            filePath: 'views/config-mana/setting.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default ConfigManaRouter
  