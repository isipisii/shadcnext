"use client"
 
import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { ShoppingCart } from "lucide-react"
import CartProductCard from "./cards/CartProductCard"

function SideCart() {
  const { cartItems, calculateTotal, total } = useCartStore(state => state)
  const cartItemsCount = cartItems.length

  useEffect(() => {
    calculateTotal()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cartItems])

  return (
    <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
            {cartItemsCount > 0 && <p className="bg-red-600 text-white text-[.65rem] bottom-6 right-0 padding py-1 px-2 rounded-full absolute">{cartItemsCount}</p>}
            <Button variant="outline" className="flex gap-2">Cart <ShoppingCart size={16} /></Button>
          </div>
        </SheetTrigger>

        <SheetContent side={"right"} className="overflow-auto gap-4 flex flex-col">
            <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
            </SheetHeader>

            {/* <div className="overflow-auto">
              <div className="max-h-[450px]"> */}
                <div className="flex flex-col">
                  {cartItems.map((cartItem, index) => (
                    <CartProductCard product={cartItem}  key={index}/>
                  ))}
                </div>
              {/* </div>
            </div> */}
        
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full">Buy {total}</Button>
              </SheetClose>
            </SheetFooter>

        </SheetContent>
    </Sheet>
  )
}

export default SideCart