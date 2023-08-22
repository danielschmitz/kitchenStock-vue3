import { reactive } from 'vue'

export const auth = reactive({
    token: '',
    isLogged() {
        return this.token !== ''
    },
    login( token:string ) {
        this.token = token
    },
    logout() {
        this.token = ''
    },
    getHeader() {
        return `Authorization: Bearer ${this.token}`
    }
})