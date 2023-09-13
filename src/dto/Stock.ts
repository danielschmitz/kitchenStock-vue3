import type Product from "./Product"

export default interface Stock {
  id?: number
  productId?: number
  quantity: number
  expires: Date
  added: Date
  price: number
  product?: Product
}
