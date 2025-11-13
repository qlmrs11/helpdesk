<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const route = useRoute()
const router = useRouter()

type Theme = 'light' | 'dark'
const theme = ref<Theme>('light')
const isAuthed = ref(false)
const role = ref<'user' | 'helper' | null>(null)

function refreshAuth() {
  try {
    const token = localStorage.getItem('auth_token')
    const userRaw = localStorage.getItem('user')
    const r = userRaw ? (JSON.parse(userRaw).role ?? null) : null
    isAuthed.value = !!token && !!r
    role.value = r
  } catch {
    isAuthed.value = false
    role.value = null
  }
}

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('theme', t)
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function logout() {
  try {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  } catch {}
  refreshAuth()
  router.push('/login')
}

function confirmLogout() {
  if (confirm('Are you sure you want to log out?')) {
    logout()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = prefersDark ? 'dark' : 'light'
  }
  refreshAuth()
  window.addEventListener('storage', (e) => {
    if (e.key === 'auth_token' || e.key === 'user') refreshAuth()
  })
  // Also listen to same-tab custom auth events
  window.addEventListener('auth-changed', () => refreshAuth())
})

watch(theme, (t) => applyTheme(t), { immediate: true })
</script>

<template>
  <div v-if="!route.meta.hideHeader && !route.meta.hideTopbar" class="app-topbar">
    <div class="topbar-content">
      <div class="left-group">
        <span class="toplabel">Contact us</span>
        <a class="toplink" href="tel:+6285200644288" title="Call">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.88.31 1.73.57 2.55a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.53-1.53a2 2 0 0 1 2.11-.45c.82.26 1.67.45 2.55.57A2 2 0 0 1 22 16.92Z" fill="currentColor"/>
          </svg>
          <span>+6285200644288</span>
        </a>
      </div>
      <a class="toplink" href="mailto:indesk@gmail.com" title="Email">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <span>indesk@gmail.com</span>
      </a>
    </div>
  </div>
  <header v-if="!route.meta.hideHeader" class="app-header">
    <h1 class="brand">InDesk</h1>
    <div class="right">
      <nav class="nav">
        <RouterLink v-if="isAuthed" :to="role==='helper' ? '/helper' : '/user'">Dashboard</RouterLink>
        <RouterLink v-if="role!=='helper'" to="/about">About</RouterLink>
        <RouterLink v-if="isAuthed && role==='user'" to="/ticket">Tickets</RouterLink>
        <RouterLink v-if="isAuthed && role==='helper'" to="/reports">Reports</RouterLink>
        <button v-if="isAuthed" class="logout-link" @click="confirmLogout">Logout</button>
      </nav>
      <button
        class="theme-toggle"
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
    </div>
  </header>

  <main class="app-main">
    <div v-if="!route.meta.hideHeader" class="container">
      <RouterView />
    </div>
    <template v-else>
      <RouterView />
    </template>
  </main>
</template>

<style scoped>
.app-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  padding: 4px 1rem;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}
.topbar-content { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.left-group { display: inline-flex; align-items: center; gap: 12px; }
.toplabel { color: var(--color-text-soft); font-size: 0.875rem; }
.toplink { display: inline-flex; gap: 6px; align-items: center; color: var(--color-text-soft); text-decoration: none; font-size: 0.875rem; }
.toplink:hover, .toplink:focus, .toplink:active { color: #3b5bdb; }

.app-header {
  position: sticky;
  top: 32px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 1rem;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.brand { font-size: 1.3rem; margin: 0; font-weight: 700; }
.right { display: inline-flex; align-items: center; gap: 12px; }
.nav { display: inline-flex; gap: 1rem; align-items: center; }
.nav a { padding: 6px 8px; border-radius: 8px; color: var(--color-heading); text-decoration: none; }
.nav a.router-link-exact-active { background: var(--color-background-soft); color: #3b5bdb; }
.nav .logout-link {
  padding: 6px 8px;
  border-radius: 8px;
  border: 0;
  background: transparent;
  color: var(--color-heading);
  cursor: pointer;
  font: inherit;
  line-height: inherit;
  text-align: left;
}
.nav a:hover,
.nav .logout-link:hover {
  background: var(--color-background-soft);
}
.app-main { padding: 1.25rem 0; margin-top: 16px; }
@media (min-width: 1024px) { .app-main { margin-top: 20px; } }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  cursor: pointer;
}
.theme-toggle .icon { display: inline-flex; }
.theme-toggle .switch {
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 999px;
  border: 1.5px solid rgba(153, 167, 194, 0.7);
  background: transparent;
}
.theme-toggle .dot {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-background);
  box-shadow: 0 0 0 2px rgba(59,91,219,0.15);
  transition: left 0.2s ease;
}
.theme-toggle .dot.on { left: 20px; }

/* Dark mode: increase contrast for visibility */
:root[data-theme='dark'] .theme-toggle {
  background: rgba(59,91,219,0.14);
  border-color: rgba(59,91,219,0.4);
}
:root[data-theme='dark'] .theme-toggle .switch { border-color: rgba(203,213,255,0.7); }
:root[data-theme='dark'] .theme-toggle .dot { box-shadow: 0 0 0 2px rgba(59,91,219,0.35); }

</style>
