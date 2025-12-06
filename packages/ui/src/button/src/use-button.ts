import { computed, inject, ref, type SetupContext } from 'vue';
import type { ButtonEmits, ButtonProps } from './type';
import { buttonGroupContextKey } from './constants';
import { useGlobalConfig } from '@/config-provider';

export const useButton = (props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) => {
    const buttonGroupContext = inject(buttonGroupContextKey, undefined);
    const globalConfig = useGlobalConfig('size');

    const _ref = ref<HTMLButtonElement>();

    const _size = computed(() => props.size || buttonGroupContext?.size || globalConfig.value || '');

    const _type = computed(() => props.type || buttonGroupContext?.type || '');

    const _plain = computed(() => props.plain ?? false);

    const _link = computed(() => props.link ?? false);

    const _round = computed(() => props.round ?? false);

    const _disabled = computed(() => props.disabled);

    const handleClick = (evt: MouseEvent) => {
        if (_disabled.value || props.loading) {
            evt.stopPropagation();
            return;
        }
        emit('click', evt);
    };

    return {
        _ref,
        _disabled,
        _type,
        _size,
        _plain,
        _link,
        _round,
        handleClick,
    };
};
