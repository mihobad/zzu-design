/**
 * 转换为短横线分隔命名法
 * @param string 字符串
 * @returns 短横线分隔命名法字符串
 * @example
 * toKebabCase('helloWorld'); // 'hello-world'
 */
export const toKebabCase = (string: string): string => {
    return string.replace(/[A-Z]+/g, (match, offset) => {
        return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
    });
};

/**
 * 转换为帕斯卡命名法
 * @param string 字符串
 * @returns 帕斯卡命名法字符串
 * @example
 * toPascalCase('hello-world'); // 'HelloWorld'
 */
export const toPascalCase = (string: string): string => {
    return string
        .replace(/^./, (match) => match.toLocaleUpperCase())
        .replace(/-(.)/g, (_, p1: string) => {
            return p1.toLocaleUpperCase();
        });
};

/**
 * 转换为驼峰命名法
 * @param string 字符串
 * @returns 驼峰命名法字符串
 * @example
 * toCamelCase('hello-world'); // 'helloWorld'
 */
export const toCamelCase = (string: string): string => {
    return string.replace(/-+(.)/g, (_, p1: string) => {
        return p1.toLocaleUpperCase();
    });
};
