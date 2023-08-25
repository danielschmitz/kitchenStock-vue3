import HttpService from './HttpService'
import type User from '@/dto/User'
import type UserSignUp from '@/dto/UserSignUp'

const UserService = {
  getUsers: async (): Promise<User[]> => (await HttpService.get('/users')).data,
  createUser: async (user: User): Promise<UserSignUp> =>
    (await HttpService.post('/users', user)).data,
  login: async (user: User): Promise<UserSignUp> => (await HttpService.post('/login', user)).data
}

export default UserService
