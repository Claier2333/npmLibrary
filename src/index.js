import qs from 'qs'
const ssoUrl = {
    dev: 'https://sso-test.ybj.com',
    test: 'https://sso-test.ybj.com',
    prod: 'https://sso-new.ybj.com'
}
const sso = { // 数据初始化
    platform: '',
    env: '',
    install (Vue, options = {}) {
        Object.assign(this, options)
    }
}

const useSSOLogout = () => {
    const params = {
        type: 'logout',
        platform: sso.platform,
        redirectUrl: window.location.origin
    }
    window.location.replace(`${ssoUrl[sso.env]}?${qs.stringify(params)}`)
}

const useSSOLogin = ({ axiso, code, status }) => {
    axiso.interceptors.response.use(
        response => {
            if (response.data.code === code || response.status === status) {
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

export { sso, useSSOLogin, useSSOLogout }
