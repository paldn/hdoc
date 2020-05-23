//3D编辑器路由
const DEditorRouter = {
    id:1000,
    route: null,
    name: null,
    title: '3D编辑器',
    type: 'folder',
    icon: 'iconfont icon-mofang',
    filePath: 'views/3d-editor/',
    order: null,
    inNav: true,
    children: [
    {
        id:1001,
        title: '3D配置',
        type: 'view',
        name: '3d-config',
        route: '/3d-editor/3d-config',
        filePath: 'views/3d-editor/3d-config.vue',
        inNav: true,
        icon: ''
    }]
}
export default DEditorRouter;