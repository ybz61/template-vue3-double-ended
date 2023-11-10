import { createRouter, createWebHashHistory } from 'vue-router'

import { isMobile } from 'mobile-device-detect'

const routes = [
  // pc端
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/pc/index/index.vue'),
    name: 'pcIndex'
  },

  // m端
  {
    path: '/m',
    redirect: '/m/index'
  },
  {
    path: '/m/index',
    component: () => import('@/views/m/index/index.vue'),
    name: 'mIndex'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 路由卫士（pc端路由在移动自动跳转到移动端路由，反之亦然，形成闭环）
router.beforeEach((to, from, next) => {
  // 1、判断当前路由是否存在 || 特殊路由
  const { path, fullPath } = to
  const routesPaths = routes.map((item) => item.path)
  const routeIsExist = routesPaths.includes(path)

  // 2、带上参数
  const querySplitArr = fullPath.split('?')
  const queryString = querySplitArr[1] ? `?${querySplitArr[1]}` : ''

  // 3、特殊情况处理：路由不存在
  if (!routeIsExist) {
    path.includes('/m/')
      ? router.push(`/m/index${queryString}`)
      : router.push(`/index${queryString}`)
    return
  }

  // 4、判断设备，正确处理
  if (!isMobile && path.includes('/m/')) {
    // next();
    // next({ name: 'pcIndex' })
    router.push(`${path.replace('/m/', '/')}${queryString}`)
  } else if (isMobile && !path.includes('/m/')) {
    router.push(`/m${path}${queryString}`)
  } else {
    next()
  }
})

export default router
