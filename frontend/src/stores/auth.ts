import { defineStore } from "pinia";
import { login as apiLogin, me as apiMe } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    async login(payload) {
      const res = await apiLogin(payload);
      // backend returns { token, role, department } as data
      const token = res.data.token || res.data.data?.token || res.data;
      this.setToken(token);
      // fetch profile
      const profile = await apiMe();
      this.setUser(profile.data);
      return profile.data;
    },
  },
});
