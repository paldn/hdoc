//动环监控路由
const DynamicEnvironmentMonitorRouter = {
    id:9000,
    route: null,
    name: null,
    title: '动环监控',
    type: 'folder',
    icon: 'iconfont icon-donghuan',
    filePath: 'views/dynamic-environment-monitor/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:9002,
            title: '温湿度',
            type: 'view',
            name: 'temperature_and_humidity',
            route: '/dynamic-environment-monitor/temperature_and_humidity',
            filePath: 'views/dynamic-environment-monitor/temperature_and_humidity.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9003,
            title: 'UPS检测',
            type: 'view',
            name: 'ups-detection',
            route: '/dynamic-environment-monitor/ups-detection',
            filePath: 'views/dynamic-environment-monitor/ups-detection.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9004,
            title: '配电柜',
            type: 'view',
            name: 'electric_closet',
            route: '/dynamic-environment-monitor/electric_closet',
            filePath: 'views/dynamic-environment-monitor/electric_closet.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9005,
            title: '精密空调',
            type: 'view',
            name: 'air_conditioner',
            route: '/dynamic-environment-monitor/air_conditioner',
            filePath: 'views/dynamic-environment-monitor/air_conditioner.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9006,
            title: '漏水检测',
            type: 'view',
            name: 'water_leakage-detection',
            route: '/dynamic-environment-monitor/water_leakage-detection',
            filePath: 'views/dynamic-environment-monitor/water_leakage-detection.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9007,
            title: '烟感检测',
            type: 'view',
            name: 'smoke_sensation-detection',
            route: '/dynamic-environment-monitor/smoke_sensation-detection',
            filePath: 'views/dynamic-environment-monitor/smoke_sensation-detection.vue',
            inNav: true,
            icon: ''
        },
        {
            id:9008,
            title: '门禁检测',
            type: 'view',
            name: 'access_control-detection',
            route: '/dynamic-environment-monitor/access_control-detection',
            filePath: 'views/dynamic-environment-monitor/access_control-detection.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default DynamicEnvironmentMonitorRouter
  