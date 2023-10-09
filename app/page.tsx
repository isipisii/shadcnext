import Products from "@/components/Products"
import getQueryClient from "@/components/providers/getQueryClient"
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "@/components/providers/HydrateClient"
import { getProducts } from "@/services/productApi"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["products"], getProducts)
  const dehydratedState = dehydrate(queryClient)

  if(!session){
    redirect("/signin")
  }

  console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 ">
      <Hydrate state={dehydratedState}>
        <Products />
      </Hydrate>
    </main>
  )
}