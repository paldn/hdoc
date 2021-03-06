//设置路由
const SettingRouter = {
    id:3000,
    route: null,
    name: null,
    title: '设置',
    type: 'folder',
    icon: 'iconfont icon-shezhi',
    filePath: 'views/setting/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:3001,
            title: '系统设置',
            type: 'folder',
            name: 'system-setting',
            route: '/setting/system-setting',
            filePath: 'views/setting/system-setting',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:300101,
                    title: '用户权限',
                    type: 'view',
                    name: 'user-auth',
                    route: '/system-setting/user-auth',
                    filePath: 'views/setting/system-setting/user-auth.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:300103,
                    title: '其它设置',
                    type: 'view',
                    name: 'another-setting',
                    route: '/system-setting/another-setting',
                    filePath: 'views/setting/system-setting/another-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:300104,
                    title: '系统日志设置',
                    type: 'view',
                    name: 'system-log-setting',
                    route: '/system-setting/system-log-setting',
                    filePath: 'views/setting/system-setting/system-log-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:300105,
                    title: 'SnmpTrap设置',
                    type: 'view',
                    name: 'snmptrap-setting',
                    route: '/system-setting/snmptrap-setting',
                    filePath: 'views/setting/system-setting/snmptrap-setting.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:3002,
            title: '告警设置',
            type: 'folder',
            name: 'alarm-setting',
            route: '/setting/alarm-setting',
            filePath: 'views/setting/alarm-setting',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:300201,
                    title: '邮件设置',
                    type: 'view',
                    name: 'email-setting',
                    route: '/alarm-setting/email-setting',
                    filePath: 'views/setting/alarm-setting/email-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:300202,
                    title: '短消息设置',
                    type: 'view',
                    name: 'message-setting',
                    route: '/alarm-setting/message-setting',
                    filePath: 'views/setting/alarm-setting/message-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:300203,
                    title: '告警模板',
                    type: 'view',
                    name: 'alarm-template',
                    route: '/alarm-setting/alarm-template',
                    filePath: 'views/setting/alarm-setting/alarm-template.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:3003,
            title: '任务计划',
            type: 'folder',
            name: 'task-plan',
            route: '/setting/task-plan',
            filePath: 'views/setting/task-plan',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:300301,
                    title: '任务计划',
                    type: 'view',
                    name: 'task-plan',
                    route: '/task-plan/task-plan',
                    filePath: 'views/setting/task-plan/task-plan.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:3004,
            title: '产品信息',
            type: 'folder',
            name: 'product-information',
            route: '/setting/product-information',
            filePath: 'views/setting/product-information',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:300401,
                    title: '关于',
                    type: 'view',
                    name: 'about',
                    route: '/product-information/about',
                    filePath: 'views/setting/product-information/about.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        }
    ]
  }
  
  export default SettingRouter
  