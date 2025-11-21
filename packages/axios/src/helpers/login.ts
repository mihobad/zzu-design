const LOGIN_CODE = -100;
const LOGIN_URL = 'www/login';

export const handleLogin = async (res: any) => {
    const { code } = res?.data || {};

    if (LOGIN_CODE === code) {
        window.location.href = `${LOGIN_URL}?redirect=${window.location.href}`;
        return;
    }
};
