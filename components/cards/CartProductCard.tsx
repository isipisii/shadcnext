"use client"

import { useCartStore } from "@/store/cartStore"
import { Button } from "../ui/button"
import { Plus, Minus } from "lucide-react"
import { Input } from "../ui/input"
import { addComma } from "@/utils/addComma"

interface ICartProductCard {
    product: ProductType
}

function CartProductCard({ product }: ICartProductCard) {
  const { increaseCartItemQuantity, decreaseCartItemQuantity, removeToCart } = useCartStore(state => state)
  const price = product.price * product.quantity

  return (
    <div className="flex gap-4 py-3">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.images[0]} alt="product" className="rounded-md object-cover h-[90px] w-[80px]" />

      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-500 text-xs">{product.category.toUpperCase()}</h1>
          <h1 className="font-semibold text-sm">{product.title}</h1>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-1 items-center">
            <Button 
              variant={'outline'} 
              size={'icon'} 
              onClick={() => product.quantity === 1 ? removeToCart(product.id) : decreaseCartItemQuantity(product.id)}
              className="h-6 w-8 text-center font-medium shadow-sm !ring-0"
            >
              <Minus size={12} />
            </Button>

            <Input
              readOnly
              value={product.quantity}
              className="h-6 w-10 text-center text-xs font-medium shadow-sm !ring-0"
            />

            <Button 
              variant={'outline'} 
              size={'icon'} 
              onClick={() => increaseCartItemQuantity(product.id)}  
              className="h-6 w-8 text-center font-medium shadow-sm !ring-0"
            >
              <Plus size={12} />
            </Button>
          </div>
          <p className="text-sm font-semibold">${addComma(price)}</p>
        </div>
      </div>
     
    </div>
  )
}

export default CartProductCard