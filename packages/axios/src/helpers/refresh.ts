const API_REFRESH_PATH = '/auth/refresh';
const REFRESH_CODE = '10001';

let refreshTokenPromise: Promise<any> | null = null;

const refreshToken = async (fetch: any) => {
    // 如果刷新令牌请求正在进行中，则直接返回该 Promise
    if (refreshTokenPromise) {
        return refreshTokenPromise;
    }

    refreshTokenPromise = (async () => {
        try {
            const refresh_token = localStorage.getItem('refresh_token');
            const res: any = await fetch(API_REFRESH_PATH, {
                method: 'post',
                data: { refresh_token },
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('refresh_token', res.refresh_token);
            return res;
        } finally {
            refreshTokenPromise = null;
        }
    })();

    return refreshTokenPromise;
};

const handleRefreshToken = async (res: any, fetch: any) => {
    const { code } = res?.data || {};

    if (REFRESH_CODE === code) {
        await refreshToken(fetch);
        const { config } = res as any;
        const { url, ...rest } = config || {};
        return fetch(url, rest);
    }
    return null;
};

export { handleRefreshToken };
