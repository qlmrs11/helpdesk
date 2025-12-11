<template>
  <div class="container">
    <div class="space-between" style="margin-bottom:16px">
      <h3>Dashboard - Helper</h3>
      <div>
        <button class="btn" @click="logout">Logout</button>
      </div>
    </div>
    <div class="card">
      <slot />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
export default {
  setup() {
    const auth = useAuthStore();
    function logout() { auth.logout(); window.location = "/login"; }
    return { logout };
  }
}
</script>
