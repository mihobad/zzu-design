<template>
    <transition :name="ns.b('fade')" @before-enter="isStartTransition = true" @before-leave="onClose" @after-leave="$emit('destroy')" appear>
        <overlay
            v-show="visible"
            custom-mask-event
            :z-index="zIdx"
            :mask="!penetrable && mask"
            :overlay-class="[overlayClass ?? '', `${ns.namespace.value}-modal-overlay`, ns.is('penetrable', penetrable)]"
        >
            <div :class="`${ns.namespace.value}-modal-wrapper`" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp">
                <div :class="ns.b()">
                    <slot></slot>
                </div>
            </div>
        </overlay>
    </transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, Transition } from 'vue';
import { modalProps, modalEmits } from './type';
import Overlay from '../../overlay';
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

const onMaskClick = (e: MouseEvent) => {
    if (props.closeOnClickModal) {
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
