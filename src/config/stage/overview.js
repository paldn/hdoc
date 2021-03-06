//总览路由
const OverViewRouter = {
    route: null,
    id:2000,
    name: null,
    title: '总览',
    type: 'folder',
    icon: 'iconfont icon-dashboard',
    filePath: 'views/overview/',
    order: null,
    inNav: true,
    children: [
      {
        id:2005,
        title: '仪表盘',
        type: 'folder',
        name: 'dashboard',
        route: '/overview/dashboard',
        filePath: 'views/overview/dashboard',
        inNav: true,
        icon: '',
        redirect:'/dashboard/device-dashboard',
        children:
        [
            {
                id:200501,
                title: '设备仪表盘',
                type: 'view',
                name: 'device-dashboard',
                route: '/dashboard/device-dashboard',
                filePath: 'views/overview/dashboard/device-dashboard.vue',
                inNav: true,
                icon: ''
            },
            {
                id:200502,
                title: '业务仪表盘',
                type: 'view',
                name: 'business-dashboard',
                route: '/dashboard/business-dashboard',
                filePath: 'views/overview/dashboard/business-dashboard.vue',
                inNav: true,
                icon: ''
            },
            {
                id:200503,
                title: '我的仪表盘',
                type: 'view',
                name: 'myself-dashboard',
                route: '/dashboard/myself-dashboard',
                filePath: 'views/overview/dashboard/myself-dashboard.vue',
                inNav: true,
                icon: ''
            },
            {
              id:200504,
              title: '资产仪表盘',
              type: 'view',
              name: 'assets-dashboard',
              route: '/dashboard/assets-dashboard',
              filePath: 'views/overview/dashboard/assets-dashboard.vue',
              inNav: true,
              icon: ''
          }
        ]
      },
      {
        id:2001,
        title: '设备运行状态',
        type: 'view',
        name: 'device-status',
        route: '/overview/device-status',
        filePath: 'views/overview/device-status.vue',
        inNav: true,
        icon: ''
      },
      {
        id:2002,
        title: 'Gis地图',
        type: 'view',
        name: 'gis-map',
        route: '/overview/gis-map',
        filePath: 'views/overview/gis-map.vue',
        inNav: true,
        icon: ''
      },
      {
        id:2003,
        title: '链路航线图',
        type: 'view',
        name: 'link-route-map',
        route: '/overview/link-route-map',
        filePath: 'views/overview/link-route-map.vue',
        inNav: true,
        icon: ''
      },
      {
        id:2004,
        title: '快速检测',
        type: 'view',
        name: 'rapid-detection',
        route: '/overview/rapid-detection',
        filePath: 'views/overview/rapid-detection.vue',
        inNav: true,
        icon: ''
      }
    ]
  }
  
  export default OverViewRouter
  