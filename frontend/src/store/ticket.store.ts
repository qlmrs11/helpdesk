// src/store/ticket.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'WAITING_USER' | 'DONE' | 'RESOLVED';
export type Category = 'IT' | 'HR';
export type Priority = 'LOW' | 'NORMAL' | 'HIGH';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: TicketStatus;
  userId: number;
  helperId: number | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  helper?: {
    id: number;
    name: string;
    email: string;
    department: string;
  };
}

interface CreateTicketData {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
}

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<Ticket[]>([]);
  const currentTicket = ref<Ticket | null>(null);
  const loading = ref(false);

  const API_URL = 'http://localhost:3000/api/ticket';

  async function fetchUserTickets() {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/user`);
      if (response.data.status === 'success') {
        tickets.value = response.data.data;
      }
    } catch (error) {
      console.error('Fetch user tickets error:', error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchHelperTickets() {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/helper`);
      if (response.data.status === 'success') {
        tickets.value = response.data.data;
      }
    } catch (error) {
      console.error('Fetch helper tickets error:', error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchTicketById(id: number) {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response.data.status === 'success') {
        currentTicket.value = response.data.data;
        return { success: true, data: response.data.data };
      }
      return { success: false };
    } catch (error: any) {
      console.error('Fetch ticket error:', error);
      return { success: false, message: error.response?.data?.message };
    } finally {
      loading.value = false;
    }
  }

  async function createTicket(data: CreateTicketData) {
    loading.value = true;
    try {
      const response = await axios.post(API_URL, data);
      if (response.data.status === 'success') {
        return { success: true, data: response.data.data, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal membuat ticket' 
      };
    } finally {
      loading.value = false;
    }
  }

  async function assignTicket(ticketId: number) {
    try {
      const response = await axios.patch(`${API_URL}/${ticketId}/assign`);
      if (response.data.status === 'success') {
        await fetchHelperTickets();
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal assign ticket' 
      };
    }
  }

  async function updateTicketStatus(ticketId: number, status: TicketStatus) {
    try {
      const response = await axios.patch(`${API_URL}/${ticketId}/status`, { status });
      if (response.data.status === 'success') {
        await fetchTicketById(ticketId);
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal update status' 
      };
    }
  }

  async function confirmResolved(ticketId: number) {
    try {
      const response = await axios.patch(`${API_URL}/${ticketId}/confirm`);
      if (response.data.status === 'success') {
        await fetchTicketById(ticketId);
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Gagal konfirmasi resolved' 
      };
    }
  }

  return {
    tickets,
    currentTicket,
    loading,
    fetchUserTickets,
    fetchHelperTickets,
    fetchTicketById,
    createTicket,
    assignTicket,
    updateTicketStatus,
    confirmResolved,
  };
});