<template>
  <div class="container">
    <div class="card" style="max-width:420px; margin:24px auto">
      <h2>Register</h2>
      <input v-model="name" class="input" placeholder="Name" />
      <input v-model="email" class="input" placeholder="Email" style="margin-top:8px"/>
      <input v-model="password" type="password" class="input" placeholder="Password" style="margin-top:8px"/>
      <select v-model="role" class="input" style="margin-top:8px">
        <option value="USER">USER</option>
        <option value="HELPER">HELPER</option>
      </select>
      <select v-if="role==='HELPER'" v-model="department" class="input" style="margin-top:8px">
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>
      <div style="margin-top:12px" class="flex">
        <button class="btn" @click="doRegister">Register</button>
      </div>
      <div v-if="err" class="small" style="color:#c53030; margin-top:8px">{{ err }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { register } from "../api/auth";
export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const role = ref("USER");
    const department = ref(null);
    const err = ref("");

    async function doRegister() {
      try {
        err.value = "";
        await register({
          name: name.value,
          email: email.value,
          password: password.value,
          role: role.value,
          department: department.value
        });
        window.location = "/login";
      } catch (e) {
        err.value = e.response?.data?.message || e.message;
      }
    }

    return { name, email, password, role, department, doRegister, err };
  }
};
</script>
