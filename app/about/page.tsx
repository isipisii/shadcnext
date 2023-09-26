import { useQuery } from "@tanstack/react-query"

async function getProducts() {
    const res = await fetch('https://dummyjson.com/products')
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function About() {
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
      })

      
    console.log(data)

    return <main></main>
}