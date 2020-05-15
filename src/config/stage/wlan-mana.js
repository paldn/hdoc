//无线管理路由
const WlanManaRouter = {
    route: null,
    name: null,
    title: '无线管理',
    type: 'folder',
    icon: 'iconfont icon-wuxian',
    filePath: 'views/wlan-mana/',
    order: null,
    inNav: true,
    children: 
    [
        {
            title: '概览',
            type: 'view',
            name: 'overview',
            route: '/wlan-mana/overview',
            filePath: 'views/wlan-mana/overview.vue',
            inNav: true,
            icon: ''
        },
        {
            title: 'AC状态',
            type: 'view',
            name: 'ac-status',
            route: '/wlan-mana/ac-status',
            filePath: 'views/wlan-mana/ac-status.vue',
            inNav: true,
            icon: ''
        },
        {
            title: 'AP状态',
            type: 'view',
            name: 'ap-status',
            route: '/wlan-mana/ap-status',
            filePath: 'views/wlan-mana/ap-status.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '用户状态',
            type: 'view',
            name: 'user-status',
            route: '/wlan-mana/user-status',
            filePath: 'views/wlan-mana/user-status.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '告警信息',
            type: 'view',
            name: 'alarm-information',
            route: '/wlan-mana/alarm-information',
            filePath: 'views/wlan-mana/alarm-information.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default WlanManaRouter
  