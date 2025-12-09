<template>
    <zzu-button @click="openModal">打开弹窗</zzu-button>
</template>

<script setup lang="ts">
import { showModal } from '@zzu/ui';
import ModalSuccess from './modal-success.vue';

const openModal = () => {
    const modal = showModal(ModalSuccess, {
        onClose: () => {
            console.log('close modal');
        },
        overlay: true,
        overlayPenetrable: false,
        closeOnClickOverlay: true,
    });
};
</script>
