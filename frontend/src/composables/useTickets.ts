import { ref, computed, watch } from 'vue'

export type TicketStatus = 'Not Yet Worked' | 'Working on' | 'Awaiting User Confirmation' | 'Completed'
export type TicketPriority = 'Low' | 'Normal' | 'High'
export type TicketCategory = 'IT' | 'HR'

export interface TicketComment {
  id: string
  at: string // ISO date
  author: string
  text: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  comments: TicketComment[]
}

const STORAGE_KEY = 'tickets_store'

function seedTickets(): Ticket[] {
  return [
    {
      id: '309',
      title: 'VPN access',
      description: 'User cannot connect to the corporate VPN from home.',
      category: 'IT',
      priority: 'Normal',
      status: 'Not Yet Worked',
      comments: [],
    },
    {
      id: '308',
      title: 'Access card replacement',
      description: 'Employee lost access card and needs a new one.',
      category: 'HR',
      priority: 'Low',
      status: 'Completed',
      comments: [
        { id: 'c1', at: new Date().toISOString(), author: 'helper', text: 'Reissued card and updated records.' },
      ],
    },
    {
      id: '307',
      title: 'Software installation',
      description: 'Install Figma and VS Code with required extensions.',
      category: 'IT',
      priority: 'High',
      status: 'Awaiting User Confirmation',
      comments: [
        { id: 'c2', at: new Date().toISOString(), author: 'helper', text: 'Installation completed. Please confirm.' },
      ],
    },
    {
      id: '310',
      title: 'Laptop failed to boot',
      description: 'Device stuck on vendor logo; possibly disk issue.',
      category: 'IT',
      priority: 'High',
      status: 'Working on',
      comments: [
        { id: 'c3', at: new Date().toISOString(), author: 'helper', text: 'Diagnosing hardware; running tests.' },
      ],
    },
  ]
}

export function useTickets() {
  const store = ref<Ticket[]>([])

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) store.value = JSON.parse(raw)
      else {
        store.value = seedTickets()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store.value))
      }
    } catch {
      store.value = seedTickets()
    }
  }

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.value))
  }

  // groupings
  const notYetWorked = computed(() => store.value.filter(t => t.status === 'Not Yet Worked'))
  const workingOn = computed(() => store.value.filter(t => t.status === 'Working on'))
  const awaiting = computed(() => store.value.filter(t => t.status === 'Awaiting User Confirmation'))
  const completed = computed(() => store.value.filter(t => t.status === 'Completed'))

  const all = computed(() => store.value)
  const byId = (id: string) => store.value.find(t => t.id === id)

  const setStatus = (id: string, status: TicketStatus) => {
    const t = byId(id)
    if (!t) return
    t.status = status
    save()
  }

  const addComment = (id: string, author: string, text: string) => {
    const t = byId(id)
    if (!t) return
    t.comments.push({ id: Math.random().toString(36).slice(2, 9), at: new Date().toISOString(), author, text })
    save()
  }

  // initialize
  load()
  watch(store, save, { deep: true })

  return {
    store,
    all,
    notYetWorked,
    workingOn,
    awaiting,
    completed,
    byId,
    setStatus,
    addComment,
  }
}
