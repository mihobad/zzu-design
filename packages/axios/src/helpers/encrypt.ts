let aiKCache: string = '';

async function getAiKey(i: number): Promise<string> {
    if (aiKCache) return aiKCache;

    aiKCache = await window.labc(i);

    return aiKCache;
}

async function secret(data: unknown) {
    if (!data) return data;
    const aiK = await getAiKey(6);
    return {
        secretStr: window.yxyz(data, aiK),
        date: new Date().getTime(),
    };
}

async function encrypt(config: any) {
    config.__data = config.data;
    config.__params = config.params;
    config.data = await secret(config.data);
    config.params = await secret(config.params);
}

export { encrypt };
