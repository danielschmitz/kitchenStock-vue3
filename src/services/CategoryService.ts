import HttpService from './HttpService'
import type Category from '@/dto/Category'

const CategoryService = {
  getAll: async (): Promise<Category[]> => (await HttpService.get('/categories')).data
}

export default CategoryService
