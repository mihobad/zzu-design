import type { AxiosRequestConfig } from 'axios';

/** 标记响应数据中 code 不为 200 时需要注意 */
export const needAttention = Symbol('needAttention');
/** 标记未成功发起 request 时产生的错误 */
export const isRequestError = Symbol('isRequestError');
/**标记 axios response */
export const isAxiosResponse = Symbol('isAxiosResponse');
/**标记成功发起 request 但请求未能成功收到响应 */
export const isNetworkError = Symbol('isNetworkError');
/**标记成功收到响应，但 http code 不为 2xx */
export const isResponseError = Symbol('isResponseError');

export const SUCCESS_CODE: number = 200;

export const DEFAULT_ERROR_MSG = '网络错误，请稍后再试';

export interface ResponseData<T = unknown> {
    retcode: string | number;
    data: T;
    message: string;
    traceId: string;
}

export interface ResponseException {
    retcode: string | number;
    data: null;
    message: string;
    traceId: string;
}

export interface FetchOptions {
    toastPending?: boolean | ToastOptions;
    toastError?: boolean | Omit<ToastOptions, 'message'>;
    errorMessageHandler?: (retcode: number | string, message: string) => string | undefined;
    encryption?: boolean;
    cancelEnable?: boolean;
}

export type FetchConfig = FetchOptions & Omit<AxiosRequestConfig, 'url'>;

export type MaybePromise<T> = T | Promise<T>;

export interface ToastOptions {
    type?: 'text' | 'loading' | 'mask';
    message?: string;
    duration?: number;
    position?: 'top' | 'middle' | 'bottom';
    forbidClick?: boolean;
    transparent?: boolean;
    once?: boolean;
}
