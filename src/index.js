import qs from 'qs'

const ssoUrl = {
    dev: 'https://sso-test.ybj.com',
    test: 'https://sso-test.ybj.com',
    prod: 'https://sso-new.ybj.com'
}

const sso = { // 数据初始化
    platform: '',
    env: 'dev',
    install(Vue, options) {
        Object.keys(options).forEach((key) => {
            this[key] = options[key]
        })
        Vue.prototype.$ssoLogout = this.ssoLogout
    },
    ssoLogout() {
        const params = {
            type: 'logout',
            platform: sso.platform,
            redirectUrl: window.location.origin
        }
        window.location.replace(`${ssoUrl[sso.env]}?${qs.stringify(params)}`)
    }
}
const ssoLogin = ({axiso, code}) =>{
    axiso.interceptors.response.use(
        response => {
            if (response.data.code === code) {
                const params = {
                    platform: sso.platform,
                    redirectUrl: window.location.href
                }
                window.location.replace(`${ssoUrl[sso.env]}?${qs.stringify(params)}`)
            }
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    return axiso
}

export { sso , ssoLogin }
