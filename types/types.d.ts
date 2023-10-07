type TProduct = {
    images: string[]
    id: number
    title: string
    description: string
    price: number
    rating: number
    stock: number
    category: string
    brand: string
    quantity: number
    thumbnail: string
}

type TSigninCredentials = {
    password: string
    email: string
}

type TSignupCredentials = {
    name: string
} & TSigninCredentials
