<template>
  <div class="container">
    <div class="card" style="max-width:420px; margin:24px auto">
      <h2>Login</h2>
      <input v-model="email" class="input" placeholder="Email" />
      <input v-model="password" type="password" class="input" placeholder="Password" style="margin-top:8px"/>
      <div style="margin-top:12px" class="flex">
        <button class="btn" @click="doLogin">Login</button>
        <router-link to="/register" class="small">Register</router-link>
      </div>
      <div v-if="err" class="small" style="color:#c53030; margin-top:8px">{{ err }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const err = ref("");
    const auth = useAuthStore();

    async function doLogin() {
      err.value = "";
      try {
        await auth.login({ email: email.value, password: password.value });
        // redirect based on role
        if (auth.user?.role === "HELPER") window.location = "/helper";
        else window.location = "/user";
      } catch (e) {
        err.value = e.response?.data?.message || e.message || "Login failed";
      }
    }

    return { email, password, doLogin, err };
  }
};
</script>
