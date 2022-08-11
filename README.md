# npmLibrary

## 安装

```js
# NPM
$ npm install xiajueqiong --save-dev

# Yarn
$ yarn add xiajueqiong
```

### 初始化SSO登录

在 main.js 中写入以下内容：

```js
import { ssoLogin } from 'xiajueqiong'

/**
 * @param {Object} option
 * @param {string} option.platform 产品编码(平台)
 * @param {string} option.baseURL 基础路径
 * @param {string} option.code 权限状态码
 * @param {string} option.env 环境
 */

const option = { platform, baseURL, code, env }
const instance = ssoLogin(option)

export const createAPI = (url, method, params, config = {}) => {
  if (method === 'get') {
    config.params = params
  } else {
    config.data = params
  }
  return instance({
    url,
    method,
    ...config
  })
}

export default instance
```

| 参数名   | 必选 | 说明                                      | 类型   | 可选值        | 默认值 |
| -------- | ---- | ----------------------------------------- | ------ | ------------- | ------ |
| platform | 是   | 产品编码(平台) ，系统注册时的产品编码     | string | -             | -      |
| baseURL  | 是   | api基础路径                               | string | -             | -      |
| code     | 否   | 权限状态码                                | string | -             | 0001   |
| env      | 是   | 环境（开发：dev，测试：test，生产：prod） | string | dev/test/prod | dev    |

## SSO退出登录

```vue
<div @click="logoutFn">退出</div>

<script>
  import { ssoLogout } from 'xiajueqiong'
    
  export default {
    methods: {
        logoutFn() {
          ssoLogout()
        }
    }
  }
</script>

```

