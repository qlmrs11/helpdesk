import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DashboardUser from "../views/DashboardUser.vue";
import DashboardHelper from "../views/DashboardHelper.vue";
import TicketDetail from "../views/TicketDetail.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/user", component: DashboardUser, meta: { requiresAuth: true, role: "USER" } },
  { path: "/helper", component: DashboardHelper, meta: { requiresAuth: true, role: "HELPER" } },
  { path: "/ticket/:id", component: TicketDetail, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next("/login");
  }
  if (to.meta.role && auth.user?.role !== to.meta.role) {
    // simple role guard: redirect to home depending on role
    return next(auth.user?.role === "HELPER" ? "/helper" : "/user");
  }
  next();
});

export default router;
