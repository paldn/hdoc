//流量分析路由
const TrafficAnalysisRouter = {
    id:8000,
    route: null,
    name: null,
    title: '流量分析',
    type: 'folder',
    icon: 'iconfont icon-72',
    filePath: 'views/traffic-analysis/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:8001,
            title: '流量监控',
            type: 'view',
            name: 'traffic-monitor',
            route: '/traffic-analysis/traffic-monitor',
            filePath: 'views/traffic-analysis/traffic-monitor.vue',
            inNav: true,
            icon: ''
        },
        {
            id:8002,
            title: '设置',
            type: 'view',
            name: 'setting',
            route: '/traffic-analysis/setting',
            filePath: 'views/traffic-analysis/setting.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default TrafficAnalysisRouter
  