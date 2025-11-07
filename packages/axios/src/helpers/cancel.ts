import axios from 'axios';
import type { AxiosRequestConfig, Canceler } from 'axios';

const repeatMap = new Map<string, Canceler>();

(window as any).REP = repeatMap;

export function addRepeat(config: AxiosRequestConfig & { __token_id?: string }): void {
    const id = uuid(config);
    if (repeatMap.has(id)) {
        const canceler = repeatMap.get(id);
        canceler?.();
        repeatMap.delete(id);
    }
    const cancelToken = new axios.CancelToken((canceler) => {
        repeatMap.set(id, canceler);
    });
    config.cancelToken = cancelToken;
    config.__token_id = id;
}

export function removeRepeat(config: AxiosRequestConfig & { __token_id?: string }): void {
    const id = config.__token_id || '';
    if (repeatMap.has(id)) {
        repeatMap.delete(id);
    }
}

function uuid(config: AxiosRequestConfig): string {
    const { method = 'get', url = '', params = {}, data = {} } = config;
    return `${method}${url}${JSON.stringify(params)}${JSON.stringify(data)}`;
}
