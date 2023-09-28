"use client"
 
import { useCartStore } from "@/store/cartStore"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { ShoppingCart } from "lucide-react"
 

function SideCart() {
  const { cartItems } = useCartStore(state => state)
  const cartItemsCount = cartItems.length

  return (
    <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
            {cartItemsCount > 0 && <p className="bg-red-600 text-white text-[.65rem] bottom-6 right-0 padding py-1 px-2 rounded-full absolute">{cartItemsCount}</p>}
            <Button variant="outline"  className="flex gap-2">Cart <ShoppingCart size={16} /></Button>
          </div>
        </SheetTrigger>

        <SheetContent side={"right"}>
            <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
            </SheetHeader>

            <div>
              {cartItems.map((cartItem, index) => {
                console.log(cartItem.quantity)
                return (
                  <div key={index}>
                    <h1>{cartItem.brand}</h1>
                    <h1>{cartItem.quantity}</h1>
                  </div>
                ) 
              })}
            </div>

            <SheetFooter>
                <Button type="submit" className="w-full">Buy</Button>
            </SheetFooter>

        </SheetContent>
    </Sheet>
  )
}

export default SideCart