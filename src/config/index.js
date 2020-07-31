const Config = {
    sideBarLevel: 3, // 侧边栏层级限制, 3表示三级, 可设置 2 和 3
    defaultRoute: '/product-information/about', // 默认打开的路由
    //baseUrl: 'http://localhost:8083',
    baseUrl: 'http://127.0.0.1:10085',//目前地址是代理的，只是为了解决跨域问题
    //baseUrl: process.env.VUE_APP_BASE_URL,
    notLoginRoute: ['login'], // 无需登录即可访问的路由 name
  }
  export default Config