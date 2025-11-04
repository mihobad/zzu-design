<template>
    <div :class="[ns.b(), ns.m(direction)]" :style="dividerStyle" role="separator">
        <div v-if="$slots.default && direction !== 'vertical'" :class="[ns.e('text'), ns.is(contentPosition)]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNamespace } from '@kg-design/use';
import { dividerProps } from './type';
import type { CSSProperties } from 'vue';

defineOptions({
    name: 'KgDivider',
});

const { direction, contentPosition, borderStyle } = defineProps(dividerProps);
const ns = useNamespace('divider');

const dividerStyle = computed(() => {
    return ns.cssVar({
        'border-style': borderStyle,
    }) as CSSProperties;
});
</script>
