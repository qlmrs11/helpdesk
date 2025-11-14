import axios from 'axios'
import { computed, reactive, toRefs } from 'vue'

export type TicketStatus = 'Not Yet Worked' | 'Working on' | 'Awaiting User Confirmation' | 'Completed'
export type TicketPriority = 'Low' | 'Normal' | 'High'
export type TicketCategory = 'IT' | 'HR'

export interface TicketComment {
  id: string
  at: string
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'

interface State {
  tickets: Ticket[]
  loading: boolean
  error: string | null
}

const state = reactive<State>({
  tickets: [],
  loading: false,
  error: null,
})

async function fetchTickets() {
  state.loading = true
  state.error = null
  try {
    const { data } = await axios.get<Ticket[]>(`${API_BASE_URL}/tickets`)
    state.tickets = data
  } catch (error) {
    console.error('Failed to fetch tickets', error)
    state.error = 'Failed to fetch tickets'
  } finally {
    state.loading = false
  }
}

async function createTicket(payload: Omit<Ticket, 'id' | 'status' | 'comments'>) {
  state.error = null
  try {
    const { data } = await axios.post<Ticket>(`${API_BASE_URL}/tickets`, payload)
    state.tickets.push(data)
    return data
  } catch (error) {
    console.error('Failed to create ticket', error)
    state.error = 'Failed to create ticket'
    throw error
  }
}

async function updateTicket(id: string, payload: Partial<Omit<Ticket, 'id' | 'comments'>>) {
  state.error = null
  try {
    const { data } = await axios.patch<Ticket>(`${API_BASE_URL}/tickets/${id}`, payload)
    const idx = state.tickets.findIndex(t => t.id === id)
    if (idx !== -1) state.tickets[idx] = data
    return data
  } catch (error) {
    console.error('Failed to update ticket', error)
    state.error = 'Failed to update ticket'
    throw error
  }
}

async function addComment(id: string, payload: { author: string; text: string }) {
  state.error = null
  try {
    const { data } = await axios.post<Ticket>(`${API_BASE_URL}/tickets/${id}/comments`, payload)
    const idx = state.tickets.findIndex(t => t.id === id)
    if (idx !== -1) state.tickets[idx] = data
    return data
  } catch (error) {
    console.error('Failed to add comment', error)
    state.error = 'Failed to add comment'
    throw error
  }
}

async function removeTicket(id: string) {
  state.error = null
  try {
    await axios.delete(`${API_BASE_URL}/tickets/${id}`)
    state.tickets = state.tickets.filter(t => t.id !== id)
  } catch (error) {
    console.error('Failed to delete ticket', error)
    state.error = 'Failed to delete ticket'
    throw error
  }
}

function useTicketsStore() {
  const notYetWorked = computed(() => state.tickets.filter(t => t.status === 'Not Yet Worked'))
  const workingOn = computed(() => state.tickets.filter(t => t.status === 'Working on'))
  const awaiting = computed(() => state.tickets.filter(t => t.status === 'Awaiting User Confirmation'))
  const completed = computed(() => state.tickets.filter(t => t.status === 'Completed'))

  const byId = (id: string) => state.tickets.find(t => t.id === id)

  return {
    ...toRefs(state),
    all: computed(() => state.tickets),
    notYetWorked,
    workingOn,
    awaiting,
    completed,
    byId,
    fetchTickets,
    createTicket,
    updateTicket,
    addComment,
    removeTicket,
  }
}

void fetchTickets()

export const useTickets = useTicketsStore
