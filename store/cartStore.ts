import { create } from 'zustand'
import { toast } from "@/components/ui/use-toast"

export type CartState = {
  cartItems: ProductType[]
  addToCart: (product: ProductType) => void
  removeToCart: (product: number) => void
  total: number
  increaseCartItemQuantity: (productId: number) => void
  decreaseCartItemQuantity: (productId: number) => void
  calculateTotal: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  total: 0,

  addToCart: (product) => {
    const existingItem = get().cartItems.find(cartItem => cartItem.id === product.id)

    if(existingItem){
       set((state) =>  ({ 
        cartItems: state.cartItems
      }))

      toast({
        title: "Existing product",
        description: `${product.title} is already in your cart`,
      })
    } else {
      set(state => ({ 
        cartItems: [...state.cartItems, {...product}]
      }))

      toast({
        title: "Added to cart",
        variant: "successful",
        description: `You have added ${product.title} to your cart`,
      })
    }
  }, 
  removeToCart: (productId) => set((state) => ({ cartItems: state.cartItems.filter(cartItem => cartItem.id !== productId) })),
  
  increaseCartItemQuantity: (productId) => set(state => ({ 
    cartItems: state.cartItems.map((cartItem) => productId === cartItem.id ? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
  })),

  decreaseCartItemQuantity: (productId) => set(state => ({ 
      cartItems: state.cartItems.map((cartItem) => productId === cartItem.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem) 
  })),

  calculateTotal: () => set((state) => ({ total: state.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)}))
}))
