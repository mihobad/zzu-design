import { isNumber, isString, isStringNumber } from './is';

export function addUnit(value?: string | number, defaultUnit = 'px'): string {
    if (!value) return '';

    if (isNumber(value) || isStringNumber(value)) {
        return `${value}${defaultUnit}`;
    } else if (isString(value)) {
        return value;
    } else {
        return '';
    }
}
