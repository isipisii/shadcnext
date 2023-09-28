import { create } from 'zustand'

export type CartState = {
  cartItems: ProductType[]
  addToCart: (item: ProductType) => void
  removeToCart: (item: number) => void
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id)
    
    return ({ 
      cartItems: existingItem ? state.cartItems.map((cartItem) => existingItem.id === cartItem.id ? {...cartItem, quantity: cartItem.quantity + 1 } : item) : [...state.cartItems, item]
    })
  }),
  removeToCart: (itemId) => set((state) => ({ cartItems: state.cartItems.filter(cartItem => cartItem.id !== itemId) })),
}))
