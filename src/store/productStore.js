import { create } from 'zustand'
import api from '../utils/api'

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    const state = get()
    if (state.loading) {
      console.log('Already loading products, skipping...')
      return
    }
    
    set({ loading: true, error: null })
    try {
      console.log('Fetching products from API...')
      const { data } = await api.get('/products')
      console.log('Products fetched successfully:', data)
      set({ products: data || [], loading: false, error: null })
    } catch (err) {
      console.error('Error fetching products:', err.message || err)
      set({ products: [], loading: false, error: err.message })
    }
  }
}))

export default useProductStore