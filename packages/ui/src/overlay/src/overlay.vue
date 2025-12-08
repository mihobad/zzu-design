<template>
    <div :class="overlayCls" :style="overlayStyle" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { overlayEmits, overlayProps } from './type';
import { useNamespace, useSameTarget } from '@zzu/use';

defineOptions({
    name: 'Overlay',
});
const { mask, overlayClass, zIndex, customMaskEvent } = defineProps(overlayProps);
const emit = defineEmits(overlayEmits);

const ns = useNamespace('overlay');

const onMaskClick = (e: MouseEvent) => {
    emit('click', e);
};

const { onClick, onMouseDown, onMouseUp } = useSameTarget(customMaskEvent ? undefined : onMaskClick);

const overlayStyle = computed(() => ({
    zIndex: zIndex,
}));

const overlayCls = computed(() => [ns.b(), mask && ns.m('mask'), overlayClass]);
</script>
