::: tip @zzu/axios
基于 axios 实现的 http 请求库。包含了token失效重试、未登录、取消请求、fetchPending、非 200 toast 报错信息、自定义错误处理等功能。
:::

## Usage

```js
import { axios, type FetchConfig } from '@zzu/axios'

interface deviceInfoIns {
  deviceId: string
}

function fetchDevice(config: FetchConfig = {}): Promise<deviceInfoIns> {
  return axios('xxx', {
    method: 'get',
    ...config
  })
}

const initDevice = async () => {
  const res = await fetchDevice({
    params: {}
  })
  console.log(res)
}

initDevice()
```

### FetchConfig

| 名称                | 类型                                                                | 默认值 | 说明                     | 是否必填 |
| ------------------- | ------------------------------------------------------------------- | ------ | ------------------------ | -------- |
| method              | enum('get', 'post')                                                 | -      | 请求方法                 | 否       |
| url                 | string                                                              | -      | 请求地址                 | 是       |
| headers             | Record<string, string>                                              | {}     | 请求头                   | 否       |
| params              | Record<string, any>                                                 | {}     | 查询参数                 | 否       |
| data                | Record<string, any>                                                 | {}     | 请求体                   | 否       |
| toastPending        | boolean                                                             | false  | 是否显示透明遮罩阻止连点 | 否       |
| toastError          | boolean                                                             | false  | 是否显示错误提示         | 否       |
| errorMessageHandler | (retcode: number \| string, message: string) => string \| undefined | -      | 自定义错误处理           | 否       |
