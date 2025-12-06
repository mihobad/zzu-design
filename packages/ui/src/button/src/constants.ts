import type { InjectionKey } from 'vue';
import type { ButtonProps } from './type';

export interface ButtonGroupContext {
    size?: ButtonProps['size'];
    type?: ButtonProps['type'];
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContext');
