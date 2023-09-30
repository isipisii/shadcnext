"use client"

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/productApi'

import ProductCard from './cards/ProductCard'
import { useCartStore } from '@/store/cartStore'

function Products () {
  const {data: products } = useQuery<ProductType[]>({queryKey: ["products"], queryFn: getProducts })
  const { addToCart } = useCartStore(state => state)

  return (
    <div className='flex items-center gap-4 flex-wrap mt-20'> 
        {products?.map((product, idx) => (
            <ProductCard product={product} key={idx} handleAddToCart={addToCart} />
        ))}
    </div>
  )
}

export default Products