import type { AxiosRequestConfig } from 'axios';

const COLORS = {
    SUCCESS: 'color: green;',
    FAIL: 'color: red;',
};

const DEV_LOG = {
    cache: new Map<string, any>(),

    add: function (config: AxiosRequestConfig & { __data?: any; __params?: any }) {
        const { url = '', method, headers, __data, __params, data, params } = config;
        this.cache.set(url, {
            method,
            headers,
            data,
            params,
            __data,
            __params,
        });
    },

    notify: function (type: 'SUCCESS' | 'FAIL', response: any) {
        const url = response.config?.url || '';
        const info = this.cache.get(url);

        if (!info || !url) {
            return;
        }

        const color = COLORS[type];
        console.groupCollapsed(`%c[Axios][${type}] ${url}`, color);
        console.log('%cRequest Method:', color, info.method);
        console.log('%cRequest Headers:', color, info.headers);
        if (info.method === 'get') {
            console.log('%cRequest Params:', color, info.__params || info.params);
            console.log('%cRequest Secret:', color, info.params);
        } else {
            console.log('%cRequest Data:', color, info.__data || info.data);
            console.log('%cRequest Secret:', color, info.data);
        }
        console.groupEnd();
    },
};

const PRD_LOG = {
    add: () => {},
    notify: () => {},
};

//@ts-ignore
const logger = import.meta.env.DEV ? DEV_LOG : PRD_LOG;

export { logger as log };
