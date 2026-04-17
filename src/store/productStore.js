import { create } from 'zustand'
import api from '../utils/api'

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  
  fetchProducts: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get('/products')
      set({ products: data, loading: false })
    } catch (err) {
      console.error('Error fetching products:', err)
      set({ loading: false })
    }
  }
}))

export default useProductStore