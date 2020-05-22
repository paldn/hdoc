//IP地址管理路由
const IpAddrRouter = {
    id:4000,
    route: null,
    name: null,
    title: 'IP地址管理',
    type: 'folder',
    icon: 'iconfont icon-IP',
    filePath: 'views/ipAddr-mana/',
    order: null,
    inNav: true,
    children: 
    [
        {
            id:4001,
            title: 'IP地址管理',
            type: 'view',
            name: 'ipaddr-mana',
            route: '/ipAddr-mana/ipaddr-mana',
            filePath: 'views/ipAddr-mana/ipaddr-mana.vue',
            inNav: true,
            icon: ''
        }
    ]
  }
  
  export default IpAddrRouter
  