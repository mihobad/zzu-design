<template>
    <transition :name="ns.b('fade')" @before-enter="isStartTransition = true" @before-leave="onClose" @after-leave="$emit('destroy')" appear>
        <div
            v-show="visible"
            :class="[ns.b(), ns.is('penetrable', penetrable), overlay ? ns.m('overlay') : '', overlayClass]"
            :style="overlayStyle"
            @click="onClick"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
        >
            <div :class="ns.b('wrapper')">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, Transition } from 'vue';
import { modalProps, modalEmits } from './type';
import { useGlobalComponentSettings } from '@/config-provider';
import { useSameTarget } from '@zzu/use';

const { ns, zIndex } = useGlobalComponentSettings('modal');
const { currentZIndex, nextZIndex } = zIndex;

const props = defineProps(modalProps);
const emit = defineEmits(modalEmits);

const isStartTransition = ref(false);
const visible = ref(false);

const zIdx = computed(() => props.zIndex ?? currentZIndex.value);

const penetrable = computed(() => props.overlayPenetrable);

const overlayStyle = computed(() => ({
    ...props.overlayStyle,
    zIndex: zIdx.value,
}));

const onMaskClick = (e: MouseEvent) => {
    if (props.closeOnClickOverlay) {
        close();
    }
};

const { onClick, onMouseDown, onMouseUp } = useSameTarget(onMaskClick);

function close() {
    visible.value = false;

    nextTick(() => {
        if (!isStartTransition.value) {
            props.onClose?.();
            emit('destroy');
        }
    });
}

onMounted(() => {
    nextZIndex();
    visible.value = true;
});

defineExpose({
    visible,
    close,
});
</script>
