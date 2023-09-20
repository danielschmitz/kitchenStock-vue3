import type Product from "./Product"

export default interface Stock {
  id?: number
  productId?: number
  quantity: number
  expires: string
  added: string
  price: number
  product?: Product
}
