
require('dotenv').config()

class testaEnv {
    get url () {
        return this.getEnv("url")
    }
    getEnv(key) {
        if (!process.env[key]) throw Error(`Envirment var error ${key}`)
        return process.env[key]
    }
}


console.log(testaEnv.url)