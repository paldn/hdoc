import Home from '@/views/home/home'
import homeRouter from './home-router'

const routes = [
  {
    path: '',
    name: 'Home',
    redirect: '/product-information/about',
    component: Home,
    children: [
      ...homeRouter
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  }
]

export default routes
