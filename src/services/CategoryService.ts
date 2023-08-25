import HttpService from './HttpService'
import type Category from '@/dto/Category'

const URI = '/categories'
const CategoryService = {
  getAll: async (): Promise<Category[]> => (await HttpService.get(URI)).data,
  search: async (term: string = ''): Promise<Category[]> =>
    (await HttpService.get(`${URI}/?q=${term}`)).data,
  getById: async (id: string): Promise<Category> => (await HttpService.get(`${URI}/${id}`)).data,
  delete: async (id: number): Promise<Category> => (await HttpService.delete(`${URI}/${id}`)).data,
  create: async (category: Category): Promise<Category> =>
    (await HttpService.post('/categories', category)).data,
  edit: async (category: Category): Promise<Category> =>
    (await HttpService.put('/categories/' + category.id, category)).data
}

export default CategoryService
