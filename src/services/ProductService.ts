import HttpService from './HttpService'
import type Product from '@/dto/Product'

const URI = '/products'
const ProductService = {
  getAll: async (): Promise<Product[]> => (await HttpService.get(URI)).data,
  search: async (term: string = ''): Promise<Product[]> =>
    (await HttpService.get(`${URI}/?q=${term}`)).data,
  getById: async (id: string): Promise<Product> => (await HttpService.get(`${URI}/${id}`)).data,
  delete: async (id: number): Promise<Product> => (await HttpService.delete(`${URI}/${id}`)).data,
  create: async (product: Product): Promise<Product> =>
    (await HttpService.post('/products', product)).data,
  edit: async (product: Product): Promise<Product> =>
    (await HttpService.put('/products/' + product.id, product)).data
}

export default ProductService
