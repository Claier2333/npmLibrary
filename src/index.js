import qs from 'qs'
import axios from 'axios'

const ssoUrl = {
    dev: 'https://sso-test.ybj.com',
    test: 'https://sso-test.ybj.com',
    prod: 'https://sso-new.ybj.com'
}
class SSO {
    constructor(config) {
        this.platform = '' // 产品编码(平台)
        this.baseURL = '' // 基础路径
        this.code = '0001' // 权限状态码
        this.env = 'dev' // 环境
        Object.keys(config).forEach((key) => {
            this[key] = config[key]
        })
        this.login()
    }
    // 登录
    login() {
        axios.defaults.baseURL = this.baseURL
        axios.interceptors.response.use(
            (response) => {
                if (response.data.code === this.code) {
                    const params = {
                        platform: this.platform,
                        redirectUrl: encodeURIComponent(window.location.href)
                    }
                    window.location.replace(`${ssoUrl[this.env]}?${qs.stringify(params)}`)
                }
                return response
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }
    // 退出
    logout() {
        const params = {
            type: 'logout',
            platform: this.platform,
            redirectUrl: window.location.origin
        }
        window.location.replace(`${ssoUrl[this.env]}?${qs.stringify(params)}`)
    }
}

export { SSO }
