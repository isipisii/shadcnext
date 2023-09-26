"use client"

import { ProductType, getProducts } from '@/app/page'
import { useQueryClient, useQuery } from '@tanstack/react-query'

const Products = () => {
  const {data: products } = useQuery<ProductType[]>({queryKey: ["products"], queryFn: getProducts })

  return (
    <div> 
        {products?.map((product, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0]} key={idx} alt='image'/> 
        ))}
    </div>
  )
}

export default Products