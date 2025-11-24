::: tip @zzu/axios
基于 axios 实现的 http 请求库。包含了token失效重试、未登录、取消请求、fetchPending、非 200 toast 报错信息、自定义错误处理等功能。
:::

## Usage

```ts
import axios, { type FetchConfig } from '@zzu/axios';
import { ref } from 'vue';

const pages = ref<Page[]>([]);

interface Page {
    id: string;
    page_id: string;
    status: number;
    page_name: string;
    description: string;
}

interface pageInfoIns {
    list: Page[];
}

function fetchPages(config: FetchConfig = {}): Promise<pageInfoIns> {
    return axios('http://localhost:3001/api/pages/list', {
        method: 'get',
        ...config,
    });
}

const initPages = async () => {
    const res = await fetchPages({
        params: {},
    });
    pages.value = res?.list || [];
};

initPages();
```

### FetchConfig

| 名称                | 类型                                                                | 默认值 | 说明                     | 是否必填 |
| ------------------- | ------------------------------------------------------------------- | ------ | ------------------------ | -------- |
| method              | enum('get', 'post')                                                 | -      | 请求方法                 | 否       |
| url                 | string                                                              | -      | 请求地址                 | 是       |
| headers             | Record<string, string>                                              | {}     | 请求头                   | 否       |
| params              | Record<string, any>                                                 | {}     | 查询参数                 | 否       |
| data                | Record<string, any>                                                 | {}     | 请求体                   | 否       |
| cancelEnable        | boolean                                                             | true   | 是否开启取消请求         | 否       |
| toastPending        | boolean                                                             | false  | 是否显示透明遮罩阻止连点 | 否       |
| toastError          | boolean                                                             | true   | 是否显示错误提示         | 否       |
| errorMessageHandler | (retcode: number \| string, message: string) => string \| undefined | -      | 自定义错误处理           | 否       |
