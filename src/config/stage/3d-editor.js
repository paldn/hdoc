//3D编辑器路由
const DEditorRouter = {
    id:1000,
    route: null,
    name: null,
    title: '3D实验室',
    type: 'folder',
    icon: 'iconfont icon-mofang',
    filePath: 'views/3d-lab/',
    order: null,
    inNav: true,
    children: [
    {
        id:1001,
        title: '3D配置器',
        type: 'view',
        name: '3d-config',
        route: '/3d-lab/3d-config',
        filePath: 'views/3d-lab/3d-config.vue',
        inNav: true,
        icon: ''
    }]
}
export default DEditorRouter;