export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

export const isUndefined = (val: unknown): val is undefined => val === undefined;

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
        return false;
    }
    return !Number.isNaN(Number(val));
};
