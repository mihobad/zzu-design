/**
 * 等待指定时间
 * @param duration 等待时间，单位毫秒
 * @returns Promise<void>
 * @example
 * await sleep(1000);  等待1秒
 */
export function sleep(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
