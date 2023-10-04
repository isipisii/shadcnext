export async function getProducts() {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    const data = await res.json()

    const productsWithQuantity =  data.products.map((product: any) => ({...product, quantity: 1}))
    return productsWithQuantity
}

export async function getCategories() {
  const res = await fetch('https://dummyjson.com/products/categories')
  const data = await res.json()

  const categories = data.map((category: string) => ({ value: category, label: category.charAt(0).toLocaleUpperCase().concat(category.slice(1))}))
  return categories
}