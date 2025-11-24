import type { AxiosRequestConfig } from 'axios';

const COLORS = {
    SUCCESS: 'color: green;',
    FAIL: 'color: red;',
};

const DEV_LOG = {
    cache: new Map<string, any>(),

    add: function (config: AxiosRequestConfig) {
        const { url = '', method, headers, data, params } = config;
        this.cache.set(url, {
            method,
            headers,
            data,
            params,
        });
    },

    notify: function (type: 'SUCCESS' | 'FAIL', response: any) {
        const url = response.config?.url || '';
        const info = this.cache.get(url);

        if (!info || !url) {
            return;
        }

        const color = COLORS[type];
        const isSuccess = type === 'SUCCESS';
        console.groupCollapsed(`%c[Axios][${type}] ${url}`, color);
        console.log('%cRequest Method:', color, info.method);
        console.log('%cRequest Headers:', color, info.headers);
        if (info.method === 'get') {
            console.log('%cRequest Params:', color, info.params);
            console.log('%cResponse Data:', color, isSuccess ? response.data : response?.response?.data);
        } else {
            console.log('%cRequest Data:', color, info.data);
            console.log('%cResponse Data:', color, isSuccess ? response.data : response?.response?.data);
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
