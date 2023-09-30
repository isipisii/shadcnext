import Products from "@/components/Products"
import getQueryClient from "@/components/providers/getQueryClient"
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "@/components/providers/HydrateClient"
import { getProducts } from "@/services/productApi"

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["products"], getProducts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 ">
      <Hydrate state={dehydratedState}>
        <Products />
      </Hydrate>
    </main>
  )
}
