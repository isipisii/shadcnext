"use client"

import { 
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter
} from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart } from 'lucide-react';

interface IItemCard {
    product: TProduct
    handleAddToCart: (product: TProduct) => void
}

const ProductCard = ({ product, handleAddToCart }: IItemCard) => {

  return (
    <Card className="w-full max-w-[300px] h-full">
      <CardHeader>
        <CardTitle className="text-[1.1rem] truncate">{product.title}</CardTitle>
        {/* <CardDescription className="text-xs">{product.description}</CardDescription> */}
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.thumbnail} alt="product image" className="rounded-md object-cover w-full h-[200px]" />
        <div className="flex items-center justify-between w-full">
          <p>${product.price}</p>
        </div>
      </CardContent>  

      <CardFooter>
        <div className="flex gap-3 w-full">
          <Button className="w-full">Buy now</Button>
          <Button className="w-1/2" size={"icon"} onClick={() => handleAddToCart(product)}><ShoppingCart size={16} /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard