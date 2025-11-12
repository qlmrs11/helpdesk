<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirm: '',
  agree: false,
})

function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.name || !form.email || !form.password) {
    alert('Please complete all fields')
    return
  }
  if (form.password !== form.confirm) {
    alert('Passwords do not match')
    return
  }
  if (!form.agree) {
    alert('Please accept Terms')
    return
  }
  console.log('Register submit', { ...form })
  // TODO: call API, then route to login or dashboard
}
</script>

<template>
  <div class="auth">
    <div class="card">
      <h2 class="title">Create account</h2>
      <p class="subtitle">Join Web Hospital</p>

      <form @submit="onSubmit" class="form">
        <label class="field">
          <span>Full name</span>
          <input v-model="form.name" type="text" placeholder="Jane Doe" required />
        </label>
        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" placeholder="you@example.com" required />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </label>
        <label class="field">
          <span>Confirm password</span>
          <input v-model="form.confirm" type="password" placeholder="••••••••" required />
        </label>

        <label class="check">
          <input v-model="form.agree" type="checkbox" />
          <span>I agree to the Terms</span>
        </label>

        <button type="submit" class="btn primary">Create account</button>

        <p class="muted">Already have an account?
          <RouterLink to="/login" class="link">Sign in</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth {
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
}
.title { margin: 0; }
.subtitle { margin: 6px 0 18px; color: var(--color-text-soft); }
.form { display: grid; gap: 16px; }
.field { display: grid; gap: 6px; }
.field input { border: 1px solid var(--color-border); border-radius: 12px; padding: 12px 14px; outline: none; height: 44px; font-size: 0.95rem; }
.check { display: inline-flex; gap: 8px; align-items: center; }
.btn { display: inline-flex; justify-content: center; width: 100%; padding: 10px 14px; border-radius: 12px; border: 1px solid var(--color-border); cursor: pointer; }
.btn.primary { background: var(--vt-c-indigo); color: white; border-color: transparent; }
.muted { color: var(--color-text-soft); margin: 8px 0 0; }
.link { font-size: 0.9rem; }

@media (max-width: 1024px) {
  .auth { justify-content: center; padding: 24px 16px; }
}
</style>
