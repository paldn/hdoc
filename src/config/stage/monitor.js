//综合监控路由
const MonitorRouter = {
    route: null,
    name: null,
    title: '综合监控',
    type: 'folder',
    icon: 'iconfont icon-jiankong',
    filePath: 'views/monitor/',
    order: null,
    inNav: true,
    children: 
    [
        {
            title: '设备管理',
            type: 'view',
            name: 'device-mana',
            route: '/monitor/device-mana',
            filePath: 'views/monitor/device-mana.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '视图展示',
            type: 'folder',
            name: 'view-display',
            route: '/monitor/view-display',
            filePath: 'views/monitor/view-display',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '状态统计',
                    type: 'view',
                    name: 'status-statistics',
                    route: '/view-display/status-statistics',
                    filePath: 'views/monitor/view-display/status-statistics.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '苹果树',
                    type: 'view',
                    name: 'apple-tree',
                    route: '/view-display/apple-tree',
                    filePath: 'views/monitor/view-display/apple-tree.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '监测视图',
                    type: 'view',
                    name: 'monitoring-view',
                    route: '/view-display/monitoring-view',
                    filePath: 'views/monitor/view-display/monitoring-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: 'Visio视图',
                    type: 'view',
                    name: 'visio-view',
                    route: '/view-display/visio-view',
                    filePath: 'views/monitor/view-display/visio-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '逻辑组管理',
                    type: 'view',
                    name: 'logical-group-mana',
                    route: '/view-display/logical-group-mana',
                    filePath: 'views/monitor/view-display/logical-group-mana.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            title: '告警管理',
            type: 'folder',
            name: 'alarm-mana',
            route: '/monitor/alarm-mana',
            filePath: 'views/monitor/alarm-mana',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '告警设置',
                    type: 'view',
                    name: 'alarm-setting',
                    route: '/alarm-mana/alarm-setting',
                    filePath: 'views/monitor/alarm-mana/alarm-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '告警泛滥控制',
                    type: 'view',
                    name: 'alarm-fault-control',
                    route: '/alarm-mana/alarm-fault-control',
                    filePath: 'views/monitor/alarm-mana/alarm-fault-control.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '告警发送记录',
                    type: 'view',
                    name: 'alarm-send-record',
                    route: '/alarm-mana/alarm-send-record',
                    filePath: 'views/monitor/alarm-mana/alarm-send-record.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '告警故障视图',
                    type: 'view',
                    name: 'alarm-fault-view',
                    route: '/alarm-mana/alarm-fault-view',
                    filePath: 'views/monitor/alarm-mana/alarm-fault-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '告警故障查询',
                    type: 'view',
                    name: 'alarm-fault-search',
                    route: '/alarm-mana/alarm-fault-search',
                    filePath: 'views/monitor/alarm-mana/alarm-fault-search.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            title: '网络拓扑',
            type: 'folder',
            name: 'network-topogoly',
            route: '/monitor/network-topogoly',
            filePath: 'views/monitor/network-topogoly',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '拓扑展示',
                    type: 'view',
                    name: 'topogoly-display',
                    route: '/network-topogoly/topogoly-display',
                    filePath: 'views/monitor/network-topogoly/topogoly-display.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '拓扑配置',
                    type: 'view',
                    name: 'topogoly-editor',
                    route: '/network-topogoly/topogoly-editor',
                    filePath: 'views/monitor/network-topogoly/topogoly-editor.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '面板配置',
                    type: 'view',
                    name: 'panel-editor',
                    route: '/network-topogoly/panel-editor',
                    filePath: 'views/monitor/network-topogoly/panel-editor.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            title: '报表统计',
            type: 'folder',
            name: 'report-statistics',
            route: '/monitor/report-statistics',
            filePath: 'views/monitor/report-statistics',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '实时报告',
                    type: 'view',
                    name: 'real-report',
                    route: '/report-statistics/real-report',
                    filePath: 'views/monitor/report-statistics/real-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '流量统计',
                    type: 'view',
                    name: 'traffic-statistics',
                    route: '/report-statistics/traffic-statistics',
                    filePath: 'views/monitor/report-statistics/traffic-statistics.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: 'TOPN报告',
                    type: 'view',
                    name: 'topn-report',
                    route: '/report-statistics/topn-report',
                    filePath: 'views/monitor/report-statistics/topn-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '故障报告',
                    type: 'view',
                    name: 'fault-report',
                    route: '/report-statistics/fault-report',
                    filePath: 'views/monitor/report-statistics/fault-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '统计报告',
                    type: 'view',
                    name: 'statistical-report',
                    route: '/report-statistics/statistical-report',
                    filePath: 'views/monitor/report-statistics/statistical-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '操作日志',
                    type: 'view',
                    name: 'option-log',
                    route: '/report-statistics/option-log',
                    filePath: 'views/monitor/report-statistics/option-log.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '巡检报告',
                    type: 'view',
                    name: 'on-site-inspection-report',
                    route: '/report-statistics/on-site-inspection-report',
                    filePath: 'views/monitor/report-statistics/on-site-inspection-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '服务器',
                    type: 'view',
                    name: 'server',
                    route: '/report-statistics/server',
                    filePath: 'views/monitor/report-statistics/server.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '网络设备',
                    type: 'view',
                    name: 'network-equipment',
                    route: '/report-statistics/network-equipment',
                    filePath: 'views/monitor/report-statistics/network-equipment.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            title: '日志监控',
            type: 'folder',
            name: 'log-monitor',
            route: '/monitor/log-monitor',
            filePath: 'views/monitor/log-monitor',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '系统日志',
                    type: 'view',
                    name: 'system-log',
                    route: '/log-monitor/system-log',
                    filePath: 'views/monitor/log-monitor/system-log.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: 'SnmpTrap日志',
                    type: 'view',
                    name: 'snmptrap-log',
                    route: '/log-monitor/snmptrap-log',
                    filePath: 'views/monitor/log-monitor/snmptrap-log.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            title: '自动发现',
            type: 'view',
            name: 'automatic-discovery',
            route: '/monitor/automatic-discovery',
            filePath: 'views/monitor/automatic-discovery.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '工具',
            type: 'folder',
            name: 'tools',
            route: '/monitor/tools',
            filePath: 'views/monitor/tools',
            inNav: true,
            icon: '',
            children:
            [
                {
                    title: '修改频率',
                    type: 'view',
                    name: 'freq-modify',
                    route: '/tools/freq-modify',
                    filePath: 'views/monitor/tools/freq-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '修改阈值',
                    type: 'view',
                    name: 'threshold-modify',
                    route: '/tools/threshold-modify',
                    filePath: 'views/monitor/tools/threshold-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '修改错误重试次数',
                    type: 'view',
                    name: 'retry-freq-modify',
                    route: '/tools/retry-freq-modify',
                    filePath: 'views/monitor/tools/retry-freq-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    title: '修改错误频率',
                    type: 'view',
                    name: 'error-freq-modify',
                    route: '/tools/error-freq-modify',
                    filePath: 'views/monitor/tools/error-freq-modify.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        }
    ]
  }
  
  export default MonitorRouter
  