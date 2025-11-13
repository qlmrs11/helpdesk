import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Dashboard from '../views/dashboard.vue'
import CreateTicket from '../views/create-ticket.vue'
import HistoryTicket from '../views/history-ticket.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import AdminDashboard from '../views/admin-dashboard.vue'
import AdminDetail from '../views/admin-detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/create-ticket', name: 'create-ticket', component: CreateTicket },
    { path: '/history-ticket', name: 'history-ticket', component: HistoryTicket },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/admin-dashboard', name: 'admin-dashboard', component: AdminDashboard },
    { path: '/admin-detail/:id', name: 'admin-detail', component: AdminDetail, props: true },
  ],
})

export default router
