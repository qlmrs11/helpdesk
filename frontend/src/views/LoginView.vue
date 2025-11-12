<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
  remember: false,
  role: 'user' as 'user' | 'helper',
})

function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.email || !form.password) {
    alert('Please fill in email and password')
    return
  }
  console.log('Login submit', { ...form })
  // TODO: call API, then route to dashboard
}
</script>

<template>
  <section class="login">
    <div class="card">
      <h2 class="title">Sign in</h2>
      <p class="subtitle">Welcome back. Please enter your details.</p>

      <div class="seg-group" role="tablist" aria-label="Role">
        <button type="button" :class="['seg', { active: form.role==='helper' }]" @click="form.role='helper'">Helper</button>
        <button type="button" :class="['seg', { active: form.role==='user' }]" @click="form.role='user'">User</button>
      </div>

      <form @submit="onSubmit" class="form">
        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" placeholder="you@company.com" required />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </label>

        <div class="row">
          <label class="check">
            <input v-model="form.remember" type="checkbox" />
            <span>Remember me</span>
          </label>
        </div>

        <button type="submit" class="btn primary">Sign in</button>
        <p class="muted">Don't have an account? <RouterLink to="/register" class="link">Create one</RouterLink></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: flex-end;
  padding: 32px 64px;
  width: 100%;
}
.card {
  width: 100%;
  max-width: 760px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 32px;
  background: var(--color-background-soft);
  box-shadow: 0 1px 1px rgba(0,0,0,.04), 0 4px 24px rgba(0,0,0,.06);
}
.title { margin: 0; font-size: 2rem; }
.subtitle { margin: 8px 0 16px; color: var(--color-text-soft); }

.seg-group {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2px;
}
.seg {
  flex: 1 1 0;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 12px 0;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  box-sizing: border-box;
}
.seg.active {
  background: var(--color-background-soft);
  border-color: #3b82f6;
}

.form { display: grid; gap: 16px; }
.field { display: grid; gap: 6px; }
.field input {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;
  background: var(--color-background);
  box-shadow: 0 1px 0 rgba(0,0,0,.02) inset;
  height: 44px;
  font-size: 0.95rem;
}
.row { display: flex; justify-content: space-between; align-items: center; }
.check { display: inline-flex; gap: 8px; align-items: center; }
.link { font-size: 0.9rem; }
.btn {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  box-shadow: 0 2px 0 rgba(0,0,0,.05) inset;
}
.btn.primary {
  color: white;
  border-color: transparent;
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
  height: 44px;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .login { justify-content: center; padding: 24px 16px; }
}
</style>
