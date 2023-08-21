import { reactive } from 'vue'

export const auth = reactive({
    authorization: '',
    isLogged() {
        return this.authorization !== ''
    },
    login( auth:string ) {
        this.authorization = auth
    },
    logout() {
        this.authorization = ''
    },
    getHeader() {
        return `Authorization: Bearer ${this.authorization}`
    }
})