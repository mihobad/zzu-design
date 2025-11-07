import Axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    DEFAULT_ERROR_MSG,
    isAxiosResponse,
    isNetworkError,
    isRequestError,
    isResponseError,
    needAttention,
    SUCCESS_CODE,
    type FetchConfig,
    type MaybePromise,
    type ResponseData,
    type ResponseException,
} from './type';
import { decPendingRequest, incPendingRequest } from './utils';
import { encrypt, addRepeat, removeRepeat, log } from './helpers';

export const axios = Axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(async (config: AxiosRequestConfig & { encryption?: boolean; cancelEnable?: boolean } = {}): Promise<any> => {
    const { headers = {}, params, data } = config;
    const encryption = config.encryption ?? true;
    const cancelEnable = config.cancelEnable ?? true;

    config.headers = headers;
    config.params = params;
    config.data = data;

    if (cancelEnable) {
        addRepeat(config);
    }

    if (encryption) {
        await encrypt(config);
    }

    log.add(config);

    return config;
});

// 通过 interceptors 为 error/response 添加辅助标记
axios.interceptors.request.use(undefined, (error) => {
    error[isRequestError] = true;

    throw error;
});

axios.interceptors.response.use(
    (res) => {
        removeRepeat(res.config);
        log.notify('SUCCESS', res);
        (res as any)[isAxiosResponse] = true;
        return res;
    },
    (err) => {
        removeRepeat(err.config || {});
        log.notify('FAIL', err);
        if (!err.request || !err.response) {
            err[isNetworkError] = true;
        } else {
            err[isResponseError] = true;
        }
        throw err;
    },
);

// 通过标记判断 error 是否为 code 不为 200 所抛出的错误，并为 error 添加类型提示
function isResponseException(error: any): error is AxiosResponse<{
    code: number | string;
    message: string;
}> & {
    [needAttention]?: true;
} {
    return error[isAxiosResponse];
}

export async function fetch<R>(
    url: string,
    { toastPending = false, toastError = false, method = 'get', errorMessageHandler, ...axiosConfig }: FetchConfig = {},
) {
    //TODO: 处理 toastPendingOptions
    const toastPendingOptions = toastPending;
    if (toastPendingOptions) {
        incPendingRequest(toastPendingOptions);
    }

    try {
        const data = await handleResponseCommon(await axios.request<ResponseData<R> & ResponseException>({ ...axiosConfig, url, method }), {
            showError: !!toastError,
        });

        return data;
    } catch (e: any) {
        if (toastError) {
            let msg: string = '';
            if (isResponseException(e)) {
                const { message } = e?.data || {};
                msg = errorMessageHandler?.(e?.data?.code, message) || message || '';
            } else if (e?.code === 'ERR_CANCELED') {
                msg = '';
            } else {
                msg = DEFAULT_ERROR_MSG;
            }

            // TODO: showToast
            console.log(msg);
        }

        throw e;
    } finally {
        if (toastPendingOptions) {
            decPendingRequest();
        }
    }
}

export function isPromise<T>(p: MaybePromise<T>): p is Promise<T> {
    return typeof (p as Promise<T>).then === 'function';
}
// 处理 response 的通用逻辑 code === 200 时返回 res.data.data, 否则抛出异常
export function handleResponseCommon<T>(response: AxiosResponse<ResponseData<T> & ResponseException>, options?: { showError?: boolean }): T;
export function handleResponseCommon<T>(response: Promise<AxiosResponse<ResponseData<T> & ResponseException>>, options?: { showError?: boolean }): Promise<T>;
export async function handleResponseCommon<T>(
    responseOrPromise: MaybePromise<AxiosResponse<ResponseData<T> & ResponseException>>,
    { showError = false } = {},
): Promise<T> {
    if (isPromise(responseOrPromise)) {
        return responseOrPromise.then((res) => handleResponseCommon(res));
    }

    const res = responseOrPromise;
    // TODO: 刷新token

    if (Number(res.data?.code) !== SUCCESS_CODE) {
        // success 表示成功 其他都进入异常
        if (showError) {
            (res as any)[needAttention] = true;
        }
        // 将 response 作为异常抛出以保留完整请求信息
        throw res;
    }

    return res.data.data;
}

export default fetch;
