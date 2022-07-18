import qs from 'qs'
// sso模块
const ssoUrl = {
    dev: 'https://sso-test.ybj.com',
    test: 'https://sso-test.ybj.com',
    prod: 'https://sso-new.ybj.com'
}
/**
 * sso登录
 * @param {string} env 环境
 * @param {string} platform 产品编码(平台)
 */
const useLogIn = (platform, env = 'test') => {
    const params = {
        platform,
        redirectUrl: encodeURIComponent(window.location.href)
    }
    window.location.replace(`${ssoUrl[env]}?${qs.stringify(params)}`)
}
/**
 * sso退出
 * @param {string} platform 产品编码(平台)
 * @param {string} env 环境
 */
const useLogout = (platform, env = 'test') => {
    const params = {
        type:'logout',
        platform,
        redirectUrl: window.location.origin
    }
    window.location.replace(`${ssoUrl[env]}?${qs.stringify(params)}`)
}

export {
    useLogIn,
    useLogout
}