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
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ShoppingBag } from "lucide-react"
import CartProductCard from "./cards/CartProductCard"
import { addComma } from "@/utils/addComma"

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
                <SheetTitle className="text-xl">Cart</SheetTitle>
            </SheetHeader>
            {cartItemsCount === 0 ? 
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center flex-col gap-4">
                  <ShoppingBag size={50} />
                  <p className="font-medium text-sm ">Your cart is Empty</p>
                </div>
              </div>  
              :
              <>
                <div className="h-[500px] overflow-auto">
                  <div className="flex flex-col">
                    {cartItems.map((cartItem, index) => (
                      <CartProductCard product={cartItem}  key={index}/>
                    ))}
                  </div>
                </div>
                
                <Separator />
                <div className="flex justify-end">
                  <p className="font-medium">Total: ${addComma(total)}</p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" className="w-full">Buy</Button>
                  </SheetClose>
                </SheetFooter>
              </>
            }
        </SheetContent>
    </Sheet>
  )
}

export default SideCart