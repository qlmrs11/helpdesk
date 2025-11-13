<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const form = reactive({
  email: '',
  password: '',
  remember: false,
  role: 'user' as 'user' | 'helper',
})

const router = useRouter()
function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.email || !form.password) {
    alert('Please fill in email and password')
    return
  }
  // Enforce role separation using a simple local accounts map
  // accounts[email] = { role: 'user'|'helper', password: string }
  let accounts: Record<string, { role: 'user' | 'helper'; password?: string } | 'user' | 'helper'> = {}
  try {
    const raw = localStorage.getItem('accounts')
    accounts = raw ? JSON.parse(raw) : {}
    // Seed default helpers if none configured
    const ensureHelper = (email: string, password: string) => {
      const entry = (accounts as any)[email]
      if (!entry) {
        ;(accounts as any)[email] = { role: 'helper', password }
      } else if (typeof entry === 'string') {
        ;(accounts as any)[email] = { role: entry as any, password }
      } else if (!entry.password) {
        entry.password = password
      }
    }
    ensureHelper('helper@indesk.com', 'password')
    ensureHelper('jajang@helper.com', '87654321')
    localStorage.setItem('accounts', JSON.stringify(accounts))
  } catch {}

  const entry = (accounts as any)[form.email]
  const existingRole: 'user' | 'helper' | undefined = typeof entry === 'string' ? (entry as any) : entry?.role
  const existingPassword: string | undefined = typeof entry === 'string' ? undefined : entry?.password
  if (form.role === 'helper') {
    if (existingRole !== 'helper') {
      alert('This email is not authorized as a helper. Use helper@indesk.com or jajang@helper.com, or mark this email as helper in storage.')
      return
    }
    if (existingPassword && form.password !== existingPassword) {
      alert('Incorrect password for helper account.')
      return
    }
  } else {
    // role === 'user'
    if (existingRole !== 'user') {
      alert('This email is not registered as a user. Please register first on the Register page.')
      return
    }
    if (existingPassword && form.password !== existingPassword) {
      alert('Incorrect password for user account.')
      return
    }
  }
  // Persist a dummy token and user role; then route based on role
  try {
    localStorage.setItem('auth_token', 'devtoken')
    localStorage.setItem('user', JSON.stringify({ email: form.email, role: form.role }))
  } catch {}
  router.push(form.role === 'helper' ? '/helper' : '/user')
}

type Theme = 'light' | 'dark'
const theme = ref<Theme>('light')
function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('theme', t)
}
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
onMounted(() => {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved === 'light' || saved === 'dark') theme.value = saved
  else theme.value = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
})
watch(theme, (t) => applyTheme(t), { immediate: true })
</script>

<template>
  <section class="login">
    <RouterLink to="/" class="auth-brand">InDesk</RouterLink>
    <button
      class="floating-toggle"
      :aria-pressed="theme==='dark'"
      :title="theme==='dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleTheme"
    >
      <span class="icon" aria-hidden="true">
        <svg v-if="theme==='dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="1.5" fill="currentColor"/>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="1.5">
            <path d="M12 2v2"/><path d="M12 20v2"/>
            <path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/>
            <path d="M2 12h2"/><path d="M20 12h2"/>
            <path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>
          </g>
        </svg>
      </span>
      <span class="switch" aria-hidden="true">
        <span class="dot" :class="{ on: theme==='dark' }"></span>
      </span>
    </button>
    <div class="card">
      <h2 class="title">Sign in</h2>
      <p class="subtitle">Sign in to your account</p>

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
.auth-brand {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 60;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  text-decoration: none;
}
.floating-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  cursor: pointer;
}
.floating-toggle .switch { position: relative; width: 34px; height: 18px; border-radius: 999px; border: 1.5px solid #99a7c2; background: transparent; }
.floating-toggle .dot { position: absolute; top: 50%; left: 2px; transform: translateY(-50%); width: 14px; height: 14px; border-radius: 50%; background: var(--color-background); box-shadow: 0 0 0 2px rgba(59,91,219,0.15); transition: left 0.2s ease; }
.floating-toggle .dot.on { left: 18px; }
.login {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 32px 64px;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  margin: 0 auto;
}
.card {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;

  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 32px;
  background: var(--color-background-soft);
  box-shadow: 0 4px 24px rgba(0,0,0,.06);
}

.title { margin: 0; font-size: 2.25rem; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; color: var(--color-heading); }
.title::after { content: none; }
.subtitle { margin: 16px 0 20px; color: var(--color-text-soft); font-size: 1.05rem; line-height: 1.5; font-weight: 500; }

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
.link { font-size: 0.9rem; color: #3b5bdb; }
.link:hover { text-decoration: underline; }
.btn {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  box-shadow: 0 2px 0 rgba(0,0,0,.05) inset;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
  font-size: 1.05rem;
}
.btn.primary {
  color: white;
  border-color: transparent;
  background: linear-gradient(180deg, #3b5bdb 0%, #274690 100%);
  height: 44px;
  font-weight: 600;
}
.btn.primary:hover {
  background: linear-gradient(180deg, #4563e6 0%, #2c4fa3 100%);
}

@media (max-width: 1024px) {
  .login { justify-content: center; padding: 24px 16px; }
}
</style>
