export async function getProducts() {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()

    const productsWithQuantity =  data.products.map((product: any) => ({...product, quantity: 0}))
    return productsWithQuantity
  }