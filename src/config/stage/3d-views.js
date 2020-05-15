//3D视图路由
const ThreeDimensionalViewRouter = {
    route: null,
    name: null,
    title: '3D视图',
    type: 'folder',
    icon: 'iconfont icon-dshitu',
    filePath: 'views/3d-views/',
    order: null,
    inNav: true,
    children: [
      {
        title: '3D展示',
        type: 'view',
        name: '3d-display',
        route: '/3d-views/3d-display',
        filePath: 'views/3d-views/3d-display.vue',
        inNav: true,
        icon: ''
      },
      {
        title: '3D配置',
        type: 'view',
        name: '3d-editor',
        route: '/3d-views/3d-editor',
        filePath: 'views/3d-views/3d-editor.vue',
        inNav: true,
        icon: ''
      },
      {
        title: '机柜配置',
        type: 'view',
        name: 'cabinet-editor',
        route: '/3d-views/cabinet-editor',
        filePath: 'views/3d-views/cabinet-editor.vue',
        inNav: true,
        icon: ''
      }
    ]
  }
  
  export default ThreeDimensionalViewRouter
  