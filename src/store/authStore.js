import { create } from 'zustand'
import api from '../utils/api'

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    set({ token: data.token, user: data.user })
    return data
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  }
}))

export default useAuthStore