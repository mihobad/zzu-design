<template>
    <div :class="[ns.b('group'), ns.bm('group', props.direction)]">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue';
import { useNamespace } from '@zzu/use';
import { buttonGroupProps } from './type';
import { buttonGroupContextKey } from './constants';

defineOptions({
    name: 'ButtonGroup',
});
const props = defineProps(buttonGroupProps);
provide(
    buttonGroupContextKey,
    reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type'),
    }),
);
const ns = useNamespace('button');
</script>
