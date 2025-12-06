<template>
    <button ref="_ref" :class="buttonCls" @click="handleClick">
        <template v-if="loading">
            <IconLoading :class="ns.is('loading')" />
        </template>
        <template v-if="icon">
            <component :is="icon" />
        </template>
        <span v-if="$slots.default">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNamespace } from '@zzu/use';
import { buttonProps, buttonEmits } from './type';
import { useButton } from './use-button';
import { IconLoading } from '@zzu/icon';

defineOptions({
    name: 'Button',
});

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const ns = useNamespace('button');
const { _ref, _disabled, _type, _size, _plain, _link, _round, handleClick } = useButton(props, emit);

const buttonCls = computed(() => {
    return [
        ns.b(),
        ns.m(_type.value),
        ns.m(_size.value),
        ns.is('disabled', _disabled.value),
        ns.is('plain', _plain.value),
        ns.is('link', _link.value),
        ns.is('round', _round.value),
        ns.is('loading', props.loading),
        ns.is('circle', props.circle),
    ];
});

defineExpose({
    _ref,
    size: _size,
    type: _type,
    disabled: _disabled,
});
</script>
