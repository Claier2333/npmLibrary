# npmLibrary

## 安装

```js
# NPM
$ npm install xiajueqiong --save-dev

# Yarn
$ yarn add xiajueqiong
```

## SSO登录

```js
import { useLogIn } from 'xiajueqiong'

/**
 * @param {string} platform 产品编码(平台)
 * @param {string} env 环境
 */
useLogIn(platform,env)
```

| 参数名   | 必选 | 说明                                      | 类型   | 可选值        | 默认值 |
| -------- | ---- | ----------------------------------------- | ------ | ------------- | ------ |
| platform | 是   | 产品编码(平台) ，系统注册时的产品编码     | string | -             | -      |
| env      | 是   | 环境（开发：dev，测试：test，生产：prod） | string | dev/test/prod | test   |



## SSO退出

```js
import { useLogout } from 'xiajueqiong'

/**
 * @param {string} platform 产品编码(平台)
 * @param {string} env 环境
 */
useLogout(platform,env)
```

| 参数名   | 必选 | 说明                                      | 类型   | 可选值        | 默认值 |
| -------- | ---- | ----------------------------------------- | ------ | ------------- | ------ |
| platform | 是   | 产品编码(平台) ，系统注册时的产品编码     | string | -             | -      |
| env      | 是   | 环境（开发：dev，测试：test，生产：prod） | string | dev/test/prod | test   |