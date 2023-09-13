import HttpService from './HttpService'
import type Stock from '@/dto/Stock'

const URI = '/stock'
const StockService = {
  getAll: async (): Promise<Stock[]> => (await HttpService.get(URI + '?_sort=expires&_order=desc&_expand=product')).data,
  search: async (term: string = ''): Promise<Stock[]> =>
    (await HttpService.get(`${URI}/?q=${term}`)).data,
  getById: async (id: string): Promise<Stock> => (await HttpService.get(`${URI}/${id}`)).data,
  delete: async (id: number): Promise<Stock> => (await HttpService.delete(`${URI}/${id}`)).data,
  create: async (Stock: Stock): Promise<Stock> =>
    (await HttpService.post(URI, Stock)).data,
  edit: async (Stock: Stock): Promise<Stock> =>
    (await HttpService.put(`${URI}/${Stock.id}`, Stock)).data
}

export default StockService
