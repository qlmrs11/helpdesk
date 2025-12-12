// src/store/auth.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'HELPER';
  department: 'IT' | 'HR' | null;
  createdAt: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    role: string;
    department: string | null;
  };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'HELPER';
  department?: 'IT' | 'HR';
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);
  const isUser = computed(() => user.value?.role === 'USER');
  const isHelper = computed(() => user.value?.role === 'HELPER');

  // Setup axios interceptor
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        token.value = response.data.data.token;
        localStorage.setItem('token', response.data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;

        // Fetch user profile
        await fetchProfile();
        
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login gagal' 
      };
    }
  }

  async function register(data: RegisterData) {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', data);
      
      if (response.data.status === 'success') {
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Register gagal' 
      };
    }
  }

  async function fetchProfile() {
    try {
      const response = await axios.get('http://localhost:3000/api/user/me');
      // Backend response langsung return user object, bukan wrapped
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Fetch profile error:', error);
      // Kalau error, coba ambil dari localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        user.value = JSON.parse(savedUser);
      }
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  }

  return {
    token,
    user,
    isAuthenticated,
    isUser,
    isHelper,
    login,
    register,
    fetchProfile,
    logout,
  };
});