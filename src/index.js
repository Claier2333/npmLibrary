import qs from 'qs'
import axios from 'axios'

const objectToFormdata = (obj, form, namespace) => {
    let fd = form || new FormData()
    let formKey

    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            let key = Array.isArray(obj)
                ? `[${property}]`
                : `.${property}`
            if (namespace) {
                formKey = namespace + key
            } else {
                formKey = property
            }

            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString())
            } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                objectToFormdata(obj[property], fd, formKey)
            } else if (obj[property] !== undefined) {
                fd.append(formKey, obj[property])
            }
        }
    }

    return fd
}

const ssoUrl = {
    dev: 'https://sso-test.ybj.com',
    test: 'https://sso-test.ybj.com',
    prod: 'https://sso-new.ybj.com'
}

const ssoLogin = (config) => {
    let _this = {
        platform: '',
        baseURL: '',
        code: '0001',
        env: 'dev'
    }
    Object.keys(config).forEach((key) => {
        _this[key] = config[key]
    })
    // 参数挂载window
    window.ssoParams = _this 

    const instance = axios.create({
        baseURL: _this.baseURL
    })

    instance
        .interceptors
        .request
        .use(config => {
            const token = localStorage.getItem('token')
            token && (config.headers.common['token'] = token)
            if (config.method === 'post' && config.data) {
                if (config.headers['Content-Type'] === 'multipart/form-data') {
                    config.data = objectToFormdata(config.data)
                    config.headers.common['Content-Type'] = 'multipart/form-data'
                }
            }
            return config
        }, error => {
            return Promise.reject(error)
        })

    instance.interceptors.response.use(
        response => {
            if (response.data.code === _this.code) {
                const params = {
                    platform: _this.platform,
                    redirectUrl: window.location.href
                }
                window.location.replace(`${ssoUrl[_this.env]}?${qs.stringify(params)}`)
            }
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    return instance
}

const ssoLogout = () => {
    const params = {
        type: 'logout',
        platform: window.ssoParams.platform,
        redirectUrl: window.location.origin
    }
    window.location.replace(`${ssoUrl[window.ssoParams.env]}?${qs.stringify(params)}`)
}

export { ssoLogin, ssoLogout }
