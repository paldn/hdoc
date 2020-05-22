//综合监控路由
const AllMonitorRouter = {
    id:1000,
    route: null,
    name: null,
    title: '综合监控',
    type: 'folder',
    icon: 'iconfont icon-jiankong1',
    filePath: 'views/allmonitor/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:1001,
            title: '设备管理',
            type: 'view',
            name: 'device-mana',
            route: '/allmonitor/device-mana',
            filePath: 'views/allmonitor/device-mana.vue',
            inNav: true,
            icon: ''
        },
        {
            id:1002,
            title: '视图展示',
            type: 'folder',
            name: 'view-display',
            route: '/allmonitor/view-display',
            filePath: 'views/allmonitor/view-display',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100201,
                    title: '状态统计',
                    type: 'view',
                    name: 'status-statistics',
                    route: '/view-display/status-statistics',
                    filePath: 'views/allmonitor/view-display/status-statistics.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100202,
                    title: '苹果树',
                    type: 'view',
                    name: 'apple-tree',
                    route: '/view-display/apple-tree',
                    filePath: 'views/allmonitor/view-display/apple-tree.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100203,
                    title: '监测视图',
                    type: 'view',
                    name: 'monitoring-view',
                    route: '/view-display/monitoring-view',
                    filePath: 'views/allmonitor/view-display/monitoring-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100204,
                    title: 'Visio视图',
                    type: 'view',
                    name: 'visio-view',
                    route: '/view-display/visio-view',
                    filePath: 'views/allmonitor/view-display/visio-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100205,
                    title: '逻辑组管理',
                    type: 'view',
                    name: 'logical-group-mana',
                    route: '/view-display/logical-group-mana',
                    filePath: 'views/allmonitor/view-display/logical-group-mana.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1003,
            title: '告警管理',
            type: 'folder',
            name: 'alarm-mana',
            route: '/allmonitor/alarm-mana',
            filePath: 'views/allmonitor/alarm-mana',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100301,
                    title: '告警设置',
                    type: 'view',
                    name: 'alarm-setting',
                    route: '/alarm-mana/alarm-setting',
                    filePath: 'views/allmonitor/alarm-mana/alarm-setting.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100302,
                    title: '告警泛滥控制',
                    type: 'view',
                    name: 'alarm-fault-control',
                    route: '/alarm-mana/alarm-fault-control',
                    filePath: 'views/allmonitor/alarm-mana/alarm-fault-control.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100303,
                    title: '告警发送记录',
                    type: 'view',
                    name: 'alarm-send-record',
                    route: '/alarm-mana/alarm-send-record',
                    filePath: 'views/allmonitor/alarm-mana/alarm-send-record.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100304,
                    title: '告警故障视图',
                    type: 'view',
                    name: 'alarm-fault-view',
                    route: '/alarm-mana/alarm-fault-view',
                    filePath: 'views/allmonitor/alarm-mana/alarm-fault-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100305,
                    title: '告警故障查询',
                    type: 'view',
                    name: 'alarm-fault-search',
                    route: '/alarm-mana/alarm-fault-search',
                    filePath: 'views/allmonitor/alarm-mana/alarm-fault-search.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1004,
            title: '网络拓扑',
            type: 'folder',
            name: 'network-topogoly',
            route: '/allmonitor/network-topogoly',
            filePath: 'views/allmonitor/network-topogoly',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100401,
                    title: '拓扑展示',
                    type: 'view',
                    name: 'topogoly-display',
                    route: '/network-topogoly/topogoly-display',
                    filePath: 'views/allmonitor/network-topogoly/topogoly-display.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100403,
                    title: '拓扑配置',
                    type: 'view',
                    name: 'topogoly-editor',
                    route: '/network-topogoly/topogoly-editor',
                    filePath: 'views/allmonitor/network-topogoly/topogoly-editor.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100403,
                    title: '面板配置',
                    type: 'view',
                    name: 'panel-editor',
                    route: '/network-topogoly/panel-editor',
                    filePath: 'views/allmonitor/network-topogoly/panel-editor.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1005,
            title: '报表统计',
            type: 'folder',
            name: 'report-statistics',
            route: '/allmonitor/report-statistics',
            filePath: 'views/allmonitor/report-statistics',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100501,
                    title: '实时报告',
                    type: 'view',
                    name: 'real-report',
                    route: '/report-statistics/real-report',
                    filePath: 'views/allmonitor/report-statistics/real-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100502,
                    title: '流量统计',
                    type: 'view',
                    name: 'traffic-statistics',
                    route: '/report-statistics/traffic-statistics',
                    filePath: 'views/allmonitor/report-statistics/traffic-statistics.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100503,
                    title: 'TOPN报告',
                    type: 'view',
                    name: 'topn-report',
                    route: '/report-statistics/topn-report',
                    filePath: 'views/allmonitor/report-statistics/topn-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100504,
                    title: '故障报告',
                    type: 'view',
                    name: 'fault-report',
                    route: '/report-statistics/fault-report',
                    filePath: 'views/allmonitor/report-statistics/fault-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100505,
                    title: '统计报告',
                    type: 'view',
                    name: 'statistical-report',
                    route: '/report-statistics/statistical-report',
                    filePath: 'views/allmonitor/report-statistics/statistical-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100506,
                    title: '操作日志',
                    type: 'view',
                    name: 'option-log',
                    route: '/report-statistics/option-log',
                    filePath: 'views/allmonitor/report-statistics/option-log.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100507,
                    title: '巡检报告',
                    type: 'view',
                    name: 'on-site-inspection-report',
                    route: '/report-statistics/on-site-inspection-report',
                    filePath: 'views/allmonitor/report-statistics/on-site-inspection-report.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100508,
                    title: '服务器',
                    type: 'view',
                    name: 'server',
                    route: '/report-statistics/server',
                    filePath: 'views/allmonitor/report-statistics/server.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100509,
                    title: '网络设备',
                    type: 'view',
                    name: 'network-equipment',
                    route: '/report-statistics/network-equipment',
                    filePath: 'views/allmonitor/report-statistics/network-equipment.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1006,
            title: '日志监控',
            type: 'folder',
            name: 'log-monitor',
            route: '/allmonitor/log-monitor',
            filePath: 'views/allmonitor/log-monitor',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100601,
                    title: '系统日志',
                    type: 'view',
                    name: 'system-log',
                    route: '/log-monitor/system-log',
                    filePath: 'views/allmonitor/log-monitor/system-log.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100602,
                    title: 'SnmpTrap日志',
                    type: 'view',
                    name: 'snmptrap-log',
                    route: '/log-monitor/snmptrap-log',
                    filePath: 'views/allmonitor/log-monitor/snmptrap-log.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1007,
            title: '自动发现',
            type: 'view',
            name: 'automatic-discovery',
            route: '/allmonitor/automatic-discovery',
            filePath: 'views/allmonitor/automatic-discovery.vue',
            inNav: true,
            icon: ''
        },
        {
            id:1009,
            title: '机房管理',
            type: 'folder',
            name: 'room-mana',
            route: '/allmonitor/room-mana',
            filePath: 'views/allmonitor/room-mana',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100901,
                    title: '3D机房展示',
                    type: 'view',
                    name: '3d-room-view',
                    route: '/room-mana/3d-room-view',
                    filePath: 'views/allmonitor/room-mana/3d-room-view.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100902,
                    title: '3D机房配置',
                    type: 'view',
                    name: '3d-room-editor',
                    route: '/room-mana/3d-room-editor',
                    filePath: 'views/allmonitor/room-mana/3d-room-editor.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100903,
                    title: '机柜配置',
                    type: 'view',
                    name: 'cabinet-editor',
                    route: '/room-mana/cabinet-editor',
                    filePath: 'views/allmonitor/room-mana/cabinet-editor.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        },
        {
            id:1008,
            title: '工具',
            type: 'folder',
            name: 'tools',
            route: '/allmonitor/tools',
            filePath: 'views/allmonitor/tools',
            inNav: true,
            icon: '',
            children:
            [
                {
                    id:100801,
                    title: '修改频率',
                    type: 'view',
                    name: 'freq-modify',
                    route: '/tools/freq-modify',
                    filePath: 'views/allmonitor/tools/freq-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100802,
                    title: '修改阈值',
                    type: 'view',
                    name: 'threshold-modify',
                    route: '/tools/threshold-modify',
                    filePath: 'views/allmonitor/tools/threshold-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100803,
                    title: '修改错误重试次数',
                    type: 'view',
                    name: 'retry-freq-modify',
                    route: '/tools/retry-freq-modify',
                    filePath: 'views/allmonitor/tools/retry-freq-modify.vue',
                    inNav: true,
                    icon: ''
                },
                {
                    id:100804,
                    title: '修改错误频率',
                    type: 'view',
                    name: 'error-freq-modify',
                    route: '/tools/error-freq-modify',
                    filePath: 'views/allmonitor/tools/error-freq-modify.vue',
                    inNav: true,
                    icon: ''
                }
            ]
        }
    ]
  }
  
  export default AllMonitorRouter
  