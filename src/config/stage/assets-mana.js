//资产管理路由
const AssetManaRouter = {
    route: null,
    name: null,
    title: '资产管理',
    type: 'folder',
    icon: 'iconfont icon-zichan',
    filePath: 'views/assets-mana/',
    order: null,
    inNav: true,
    children: 
    [
        {
            title: '概览',
            type: 'view',
            name: 'overview',
            route: '/assets-mana/overview',
            filePath: 'views/assets-mana/overview.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '资产清单',
            type: 'view',
            name: 'asset-list',
            route: '/assets-mana/asset-list',
            filePath: 'views/assets-mana/asset-list.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '信息变更',
            type: 'view',
            name: 'information-change',
            route: '/assets-mana/information-change',
            filePath: 'views/assets-mana/information-change.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '维保记录',
            type: 'view',
            name: 'maintenance-record',
            route: '/assets-mana/maintenance-record',
            filePath: 'views/assets-mana/maintenance-record.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '清理报废',
            type: 'view',
            name: 'scrap-cleaning',
            route: '/assets-mana/scrap-cleaning',
            filePath: 'views/assets-mana/scrap-cleaning.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '资产盘点',
            type: 'view',
            name: 'asset-inventory',
            route: '/assets-mana/asset-inventory',
            filePath: 'views/assets-mana/asset-inventory.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '资产设置',
            type: 'view',
            name: 'asset-setting',
            route: '/assets-mana/asset-setting',
            filePath: 'views/assets-mana/asset-setting.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '综合查询',
            type: 'view',
            name: 'comprehensive-search',
            route: '/assets-mana/comprehensive-search',
            filePath: 'views/assets-mana/comprehensive-search.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '统计报表',
            type: 'view',
            name: 'statistical-report',
            route: '/assets-mana/statistical-report',
            filePath: 'views/assets-mana/statistical-report.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '预定义字段',
            type: 'view',
            name: 'predefined-field',
            route: '/assets-mana/predefined-field',
            filePath: 'views/assets-mana/predefined-field.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '预定义字段分组',
            type: 'view',
            name: 'predefined-field-group',
            route: '/assets-mana/predefined-field-group',
            filePath: 'views/assets-mana/predefined-field-group.vue',
            inNav: true,
            icon: ''
        },
        {
            title: '预定义模板',
            type: 'view',
            name: 'predefined-template',
            route: '/assets-mana/predefined-template',
            filePath: 'views/assets-mana/predefined-template.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default AssetManaRouter
  