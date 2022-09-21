# npmLibrary

## 安装

```js
# NPM
$ npm install xiajueqiong --save-dev

# Yarn
$ yarn add xiajueqiong
```

### 初始化参数

在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import sso from 'xiajueqiong'

/**
 * @param {Object} option
 * @param {string} option.platform 产品编码(平台)
 * @param {string} option.env 环境
 */

Vue.use(sso, { platform, env })
```

| 参数名   | 必选 | 说明                                      | 类型   | 可选值        | 默认值 |
| -------- | ---- | ----------------------------------------- | ------ | ------------- | ------ |
| platform | 是   | 产品编码(平台) ，系统注册时的产品编码     | string | -             | -      |
| env      | 是   | 环境（开发：dev，测试：test，生产：prod） | string | dev/test/prod | dev    |

## SSO退出

```vue
<template>
  <div @click="Logout()">退出</div>
</template>

<script>
import sso from 'xiajueqiong'

export default {
    methods: {
        Logout() {
            sso.useSSOLogout()
        }
    }
}
</script>

```

## SSO登录拦截

在http.js文件中写入以下内容：

```js
import axios from 'axios'
import sso from 'xiajueqiong'
const instance = axios.create()

/**
 * @param {Object} option
 * @param {Object} option.axiso 函数对象
 * @param {string} option.code 权限状态码
 */
sso.useSSOLogin({ axiso:instance，code })
```

| 参数名 | 必选 | 说明           | 类型   | 可选值 | 默认值 |
| ------ | ---- | -------------- | ------ | ------ | ------ |
| axiso  | 是   | axios 函数对象 | Object | -      | -      |
| code   | 是   | 权限状态码     | string | -      | -      |
