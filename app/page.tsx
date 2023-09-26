import Products from "@/components/Products"
import getQueryClient from "@/components/providers/getQueryClient"
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "@/components/providers/HydrateClient"

export async function getProducts() {
  const res = await fetch('https://dummyjson.com/products')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data.products
}

export type ProductType = {
  images: string[]
  id: number
}

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["products"], getProducts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hydrate state={dehydratedState}>
        <Products />
      </Hydrate>
    </main>
  )
}
