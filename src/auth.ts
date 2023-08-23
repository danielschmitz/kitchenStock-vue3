import { reactive } from 'vue'
export const TOKEN_KEY = 'token'
export const auth = reactive({
    token: '',
    isLogged() {
        return this.token !== ''
    },
    login( token:string ) {
        this.token = token
        localStorage.setItem(TOKEN_KEY, token)
    },
    logout() {
        this.token = ''
        localStorage.setItem(TOKEN_KEY, '')
    },
    getHeader() {
        return `Authorization: Bearer ${this.token}`
    }
})

// export const auth = {
//   login: (token: string) => localStorage.setItem('token', token),
//   logout: () => localStorage.setItem('token', ''),
//   isLogged: () => {
//     const token = localStorage.getItem('token')
//     if (token == '') return false
//     if (token == null) return false
//     return true
//   },
//   getHeader: () => `Authorization: Bearer ${localStorage.getItem('token')}`
// }
