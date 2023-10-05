"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/productApi'

import ProductCard from './cards/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { ComboBox } from './ComboBox'

function Products () {
  const { data: products } = useQuery<TProduct[]>({queryKey: ["products"], queryFn: getProducts })
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
  const { addToCart } = useCartStore(state => state)
 
  function filterProductsCategory(category: string): void {
    if(!products) return 

    setFilteredProducts(products.filter(product => product.category === category))
  }

  return (
    <div className='mt-20' >
      <ComboBox filterProductsCategory={filterProductsCategory} />
      <div className='flex items-center gap-4 flex-wrap mt-4'> 
        {(filteredProducts.length > 0 ? filteredProducts : products)?.map((product, idx) => (
            <ProductCard product={product} key={idx} handleAddToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}

export default Products