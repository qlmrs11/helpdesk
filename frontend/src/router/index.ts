import { createRouter, createWebHistory } from 'vue-router'
import UserDashboardView from '../views/UserDashboardView.vue'
import HelperDashboardView from '../views/HelperDashboardView.vue'
import LoginView from '../views/LoginView.vue'
import ReportsView from '../views/ReportsView.vue'
import TicketView from '../views/TicketView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserDashboardView,
      meta: { requiresAuth: true, role: 'user' },
    },
    {
      path: '/helper',
      name: 'helper',
      component: HelperDashboardView,
      meta: { requiresAuth: true, role: 'helper', hideTopbar: true },
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView,
      meta: { requiresAuth: true, role: 'user' },
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: { requiresAuth: true, role: 'helper', hideTopbar: true },
    },
    { path: '/', redirect: '/user' },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideHeader: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideHeader: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('auth_token')
  const userRaw = localStorage.getItem('user')
  let role: 'user' | 'helper' | null = null
  try { role = userRaw ? (JSON.parse(userRaw).role ?? null) : null } catch {}

  if (to.meta && (to.meta as any).requiresAuth && !token) {
    return { path: '/login' }
  }

  if ((to.path === '/login' || to.path === '/register') && token && role) {
    return role === 'helper' ? { path: '/helper' } : { path: '/user' }
  }

  const requiredRole = (to.meta as any)?.role as 'user' | 'helper' | undefined
  if (requiredRole && role && requiredRole !== role) {
    return role === 'helper' ? { path: '/helper' } : { path: '/user' }
  }
})

export default router
