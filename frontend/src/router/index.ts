// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { guest: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/dashboard/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ticket/create',
    name: 'TicketCreate',
    component: () => import('@/views/ticket/TicketCreateView.vue'),
    meta: { requiresAuth: true, role: 'USER' },
  },
  {
    path: '/ticket/:id',
    name: 'TicketDetail',
    component: () => import('@/views/ticket/TicketDetailView.vue'),
    meta: { requiresAuth: true },
  },
  // ← TAMBAH ROUTE INI
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/notification/NotificationListView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Router Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  const isAuthenticated = !!token;
  const userRole = user?.role;

  // Jika halaman butuh auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  // Jika sudah login, ga bisa akses login/register
  if (to.meta.guest && isAuthenticated) {
    return next('/home');
  }

  // Cek role spesifik
  if (to.meta.role && userRole !== to.meta.role) {
    return next('/home');
  }

  next();
});

export default router;