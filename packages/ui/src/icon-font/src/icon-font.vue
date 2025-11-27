<template>
    <svg :class="cls" :style="innerStyle" fill="currentColor">
        <slot />
    </svg>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { useNamespace } from '@zzu/use';
import { isUndefined, addUnit } from '@zzu/utils';
import { iconFontProps, iconEmits } from './type';

defineOptions({
    name: 'ZzuIconFont',
});

const { type, size, rotate, spin } = defineProps(iconFontProps);
const ns = useNamespace('icon');
const emit = defineEmits(iconEmits);

const cls = computed(() => {
    return [ns.b(), `${ns.m(type)}`, ns.is('loading', spin)];
});

const innerStyle = computed(() => {
    const styles: CSSProperties = {};

    if (size) {
        styles.fontSize = isUndefined(size) ? undefined : addUnit(size);
    }

    if (rotate) {
        styles.transform = `rotate(${rotate}deg)`;
    }

    return styles;
});

const onClick = (ev: MouseEvent) => {
    emit('click', ev);
};

defineExpose({
    cls,
    innerStyle,
    onClick,
});
</script>
