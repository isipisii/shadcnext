"use client"

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/productApi'

import ItemCard from './ItemCard'
import { useCartStore } from '@/store/cartStore'

const Products = () => {
  const {data: products } = useQuery<ProductType[]>({queryKey: ["products"], queryFn: getProducts })
  const { addToCart, cartItems } = useCartStore(state => state)

  function handleAddToCart(product: ProductType): void {
    addToCart(product)
  }

  console.log(cartItems)
  return (
    <div className='flex items-center gap-4 flex-wrap mt-20'> 
        {products?.map((product, idx) => (
            <ItemCard product={product} key={idx} handleAddToCart={handleAddToCart} />
        ))}
    </div>
  )
}

export default Products