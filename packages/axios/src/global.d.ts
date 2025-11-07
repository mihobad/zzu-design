declare global {
    interface Window {
        yxyz: (data: unknown, aiK: string) => any;
        labc: (index: number) => Promise<string>;
    }
}

export {};
