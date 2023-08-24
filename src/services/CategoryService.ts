import HttpService from './HttpService'
import type Category from '@/dto/Category'

const URI = '/categories'
const CategoryService = {
  getAll: async (): Promise<Category[]> => (await HttpService.get(URI)).data,
  create: async (category: Category): Promise<Category> =>
    (await HttpService.post('/categories', category)).data,
}

export default CategoryService
